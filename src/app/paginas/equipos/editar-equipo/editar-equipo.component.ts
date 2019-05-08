import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material';
import { AgregarAlumnoEquipoComponent } from './agregar-alumno-equipo/agregar-alumno-equipo.component';

// Clases
import { Equipo, Alumno, AsignacionEquipo } from '../../../clases/index';

// Servicios
import { EquipoService, AlumnoService, GrupoService } from '../../../servicios/index';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.css']
})
export class EditarEquipoComponent implements OnInit {

  // PONEMOS LAS COLUMNAS DE LA TABLA Y LA LISTA QUE TENDRÁ LA INFORMACIÓN QUE QUEREMOS MOSTRAR
  displayedColumns: string[] = ['nombreAlumno', 'primerApellido', 'segundoApellido', 'alumnoId', ' '];

  equipo: Equipo;
  alumnosEquipo: Alumno[];
  asginacionEquipo: AsignacionEquipo[];

  // Alumnos que ya estan asignados a un equipo. Debemos iniciarlo vacio para que vaya el push
  alumnosAsignados: Alumno[] = [];

  // Recuperamos los alumnos del grupo
  alumnosGrupo: Alumno[];

  // Lista con los alumnos del grupo que todavida no tienen equipo. Debemos iniciarlo vacio para que vaya el push
  alumnosAsignables: Alumno[] = [];

  constructor( private equipoService: EquipoService,
               private alumnoService: AlumnoService,
               private grupoService: GrupoService,
               public dialog: MatDialog,
               private location: Location ) { }

  ngOnInit() {
    this.equipo = this.equipoService.DameEquipo();
    this.alumnosEquipo = this.alumnoService.DameAlumnos();
    console.log('incio componente editar equipo');
    console.log(this.alumnosEquipo);

    this.AsignacionEquipo();
    this.AlumnosDelGrupo();

  }

  // NOS DEVUELVE LAS RELACIONES ENTRE ALUMNO/EQUIPO. PODEMOS VER SI EL ALUMNO TIENE GRUPO O NO
  AsignacionEquipo() {

    this.equipoService.AsignacionEquipoGrupo(this.equipo.grupoId)
    .subscribe(res => {
      if (res[0] !== undefined) {
        console.log('Voy a dar asignaciones');
        this.asginacionEquipo = res;
        console.log(this.asginacionEquipo);
      } else {
        console.log('no hay asignaciones');
      }

    });
  }

  // LE PASAMOS EL IDENTIFICADOR DEL GRUPO Y BUSCAMOS LOS ALUMNOS QUE TIENE
  AlumnosDelGrupo() {

    this.grupoService.MostrarAlumnosGrupo(this.equipo.grupoId)
    .subscribe(res => {
      console.log('entro a por los alumnos del grupo');

      if (res[0] !== undefined) {
        this.alumnosGrupo = res;
        console.log(this.alumnosGrupo);
      } else {
        console.log('No hay alumnos en este grupo');
      }
    });
  }

  // ESTA FUNCIÓN RECORRE TODA LA LISTA DE LOS ALUMNOS QUE TIENE EL GRUPO Y BUSCA SI YA TIENE ASIGNADO UN EQUIPO O NO.
  // ESTO NOS PERMITIRÁ CREAR DOS LISTAS: UNO CON LOS ALUMNOS QUE YA TIENEN EQUIPO Y OTROS QUE TODAVÍA NO TIENEN.
  ListaAlumnosAsignables() {

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.alumnosGrupo.length; i++) {

      // PRIMERO MIRAMOS SI HAY ALGUNA ASIGNACIÓN HECHA EN ESTE GRUPO O NO. SI NO HAY NINGUNA ASIGNACIÓN A NINGÚN EQUIPO HECHA
      // SIGNIFICA QUE TODOS LOS ALUMNOS DEL GRUPO PUEDEN METERSE EN CUALQUIER EQUIPO. SERÍA ILÓGICO BUSCAR EN ALGO VACÍO
      if (this.asginacionEquipo != null) {

        // EN CASO DE TENER ASIGNADO UN EQUIPO (TRUE) LO INCLUIMOS EN LA LISTA DE ALUMNOS ASIGNADOS
        if (this.BuscarAlumnoAsignacionEquipo(this.alumnosGrupo[i].id) === true) {
          this.alumnosAsignados.push(this.alumnosGrupo[i]);

          // SI NO ESTA ASIGNADO TODAVIDA A NINGÚN GRUPO, LO PONEMOS EN LA LISTA DE ALUMNOS ASIGNABLES
        } else  {
          this.alumnosAsignables.push(this.alumnosGrupo[i]);
        }
      } else {
        this.alumnosAsignables.push(this.alumnosGrupo[i]);
      }

    }
  }

  // ESTA FUNCIÓN NOS DEVOLERÁ UN TRUE O FALSE EN FUNCIÓN DE SI ENCUENTRA UNA ASIGNACIÓN A EQUIPO DEL ALUMNO DEL QUE PASAMOS
  // SU IDENTIFICADOR
  BuscarAlumnoAsignacionEquipo(alumnoId: number): boolean {

    let alumnoEncontrado: boolean;

    // BUSCO DENTRO DE LA LISTA QUE LE PASO AL INICIAR EL COMPONENTE QUE CONTIENE LAS ASIGNACIONES DE ESTE GRUPO
    const asignacion = this.asginacionEquipo.filter(res => res.alumnoId === alumnoId)[0];

    // SI NOS DEVUELVE ALGO, SIGNIFICA QUE ESTE ALUMNO TIENE UNA ASIGNACIÓN A ALGUN EQUIPO EN ESE GRUPO
    if (asignacion !== undefined) {
      alumnoEncontrado = true;

      // SI NOS DEVUELVE UNDEFINED, SIGNIFICA QUE ESE ALUMNO NO TIENE EQUIPO TODAVIA
    } else {
      alumnoEncontrado = false;
    }

    return alumnoEncontrado;
  }

    // LE PASAMOS EL IDENTIFICADOR DEL GRUPO Y BUSCAMOS LOS ALUMNOS QUE TIENE
  AlumnosDelEquipo(equipoId: number) {

    this.equipoService.MostrarAlumnosEquipo(equipoId)
    .subscribe(res => {
    if (res[0] !== undefined) {
      this.alumnosEquipo = res;
      console.log(this.alumnosEquipo);
    } else {
      console.log('No hay alumnos en este grupo');
      }
    });
  }

  // BorrarAlumnoEquipo(alumno: Alumno) {
  //   console.log('voy a borrar a ' + alumno.Nombre);
  //   this.equipoService.BorrarAlumnoEquipo(alumno, this.equipo.id, this.equipo.grupoId)
  //   .subscribe(res => {
  //     if (res !== null) {
  //       this.AlumnosDelEquipo(this.equipo.id);
  //       console.log('eliminado correctamente');
  //       console.log(this.alumnosEquipo);
  //     } else {
  //       console.log('No se ha podido eliminar');
  //       }
  //     });

  // }

    // SE ABRE EL DIÁLOGO PARA AÑADIR ALUMNOS AL EQUIPO
  AbrirDialogoAgregarAlumnosEquipo(): void {
    this.ListaAlumnosAsignables();
    const dialogRef = this.dialog.open(AgregarAlumnoEquipoComponent, {
      width: '80%',
      height: 'auto',

      // LE ENVIAMOS LOS ALUMNOS QUE TIENE ACTUALMENTE EL EQUIPO Y LOS QUE PODEMOS AÑADIR, ADEMÁS DEL EQUIPO QUE NOS SERÁ
      // ÚTIL PARA SABER SU ID Y EL ID DEL GRUPO AL QUE PERTENCE
      data: {
        alumnosEquipo: this.alumnosEquipo,
        alumnosAsignables: this.alumnosAsignables,
        equipo: this.equipo
      }
    });

    // RECUPERAREMOS LA NUEVA LISTA DE LOS ALUMNOS ASIGNABLES Y VOLVEREMOS A BUSCAR LOS ALUMNOS QUE TIENE EL EQUIPO
    dialogRef.beforeClosed().subscribe(result => {
      this.AlumnosDelEquipo(this.equipo.id);
      this.alumnosAsignables = result;

    });
 }

  // NOS DEVOLVERÁ AL INICIO
  goBack() {
    this.location.back();
  }
}
