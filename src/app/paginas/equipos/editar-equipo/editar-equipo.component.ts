import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material';
import { AgregarAlumnoEquipoComponent } from '../agregar-alumno-equipo/agregar-alumno-equipo.component';

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

  // NOS DEVUELVE LA RELACIÓN ENTRE UN ALUMNO Y UN EQUIPO
  asginacionEquipo: AsignacionEquipo[];

  // Recuperamos los alumnos del grupo
  alumnosGrupo: Alumno[];

  // Alumnos que ya estan asignados a un equipo. Debemos iniciarlo vacio para que vaya el push
  alumnosConEquipo: Alumno[] = [];

  // Lista con los alumnos del grupo que todavida no tienen equipo. Debemos iniciarlo vacio para que vaya el push
  alumnosSinEquipo: Alumno[] = [];

  constructor( private equipoService: EquipoService,
               private alumnoService: AlumnoService,
               private grupoService: GrupoService,
               public dialog: MatDialog,
               private location: Location ) { }

  ngOnInit() {
    this.equipo = this.equipoService.RecibirEquipoDelServicio();
    this.alumnosEquipo = this.alumnoService.RecibirListaAlumnosDelServicio();
    this.alumnosGrupo = this.grupoService.RecibirAlumnosGrupoDelServicio();

    // Una vez recibidos los parámetros, clasificamos los alumnos en función de si tienen en equipo o no
    this.ClasificacionAlumnos();

  }


  // ESTA FUNCIÓN SE ACTIVA CUANDO INICIAMOS EL COMPONENTE. NOS CLASIFICA A LOS ALUMNOS SEGÚN SI TIENEN O NO EQUIPO
  ClasificacionAlumnos() {

    // Recogemos las asignaciones
    this.equipoService.GET_AsignacionesEquipoDelGrupo(this.equipo.grupoId)
    .subscribe(asignaciones => {

      // Si hay algun alumno en algun equipo, devolveremos las asignaciones y activaremos la funcion AlumnosAsignables
      if (asignaciones [0] !== undefined) {
        console.log('Voy a dar asignaciones');
        // cuando recibimos las asignaciones las metemos en su lista
        this.asginacionEquipo = asignaciones;
        this.AlumnosAsignables();

        // En el caso de que no haya ningún alumno en ningun grupo, igualmente activamos la función AlumnosAsignables
      } else {
        console.log('no hay asignaciones');
        this.AlumnosAsignables();
      }
    });
  }

  // ESTA FUNCIÓN RECORRE TODA LA LISTA DE LOS ALUMNOS QUE TIENE EL GRUPO Y BUSCA SI YA TIENE ASIGNADO UN EQUIPO O NO.
  // ESTO NOS PERMITIRÁ CREAR DOS LISTAS: UNO CON LOS ALUMNOS QUE YA TIENEN EQUIPO Y OTROS QUE TODAVÍA NO TIENEN.
  AlumnosAsignables() {

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.alumnosGrupo.length; i++) {

      // PRIMERO MIRAMOS SI HAY ALGUNA ASIGNACIÓN HECHA EN ESTE GRUPO O NO. SI NO HAY NINGUNA ASIGNACIÓN A NINGÚN EQUIPO HECHA
      // SIGNIFICA QUE TODOS LOS ALUMNOS DEL GRUPO PUEDEN METERSE EN CUALQUIER EQUIPO. SERÍA ILÓGICO BUSCAR EN ALGO VACÍO
      if (this.asginacionEquipo != null) {

        // EN CASO DE TENER ASIGNADO UN EQUIPO (TRUE) LO INCLUIMOS EN LA LISTA DE ALUMNOS ASIGNADOS
        if (this.BuscarAlumnoAsignacionEquipo(this.alumnosGrupo[i].id) === true) {
          this.alumnosConEquipo.push(this.alumnosGrupo[i]);

          // SI NO ESTA ASIGNADO TODAVIDA A NINGÚN GRUPO, LO PONEMOS EN LA LISTA DE ALUMNOS ASIGNABLES
        } else  {
          this.alumnosSinEquipo.push(this.alumnosGrupo[i]);
        }

      // SI NO HAY NINGUNA ASIGNACIÓN HECHA SIGNIFICA QUE TODOS LOS ALUMNOS DEL GRUPO ESTAN SIN EQUIPO
      } else {
        this.alumnosSinEquipo.push(this.alumnosGrupo[i]);
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

  // LE PASAMOS EL IDENTIFICADOR DEL GRUPO Y BUSCAMOS LOS ALUMNOS QUE TIENE. LA UTILIZAMOS PARA ACTUALIZAR LA TABLA
  AlumnosDelEquipo(equipoId: number) {

    this.equipoService.GET_AlumnosEquipo(equipoId)
    .subscribe(res => {
    if (res[0] !== undefined) {
      this.alumnosEquipo = res;
    } else {
      console.log('No hay alumnos en este grupo');
      this.alumnosEquipo = undefined;
      }
    });
  }

  // SI UN ALUMNO SE BORRA DE UN EQUIPO, PUEDE SER ELEGIDO DE NUEVO. TENEMOS QUE ELIMINARLO DE LA LISTA DE ALUMNOS CON EQUIPO
  // ESTA FUNCIÓN FILTRA LOS ALUMNOS QUE TIENEN UN ALUMNO ID DIFERENTE AL QUE LE PASAMOS Y NOS DEVUELVE LA LISTA SIN ESE ALUMNO
  // NOS DEVUELVE LA LISTA DE ALUMNOS CON EQUIPO SIN EL ALUMNO QUE SE BORRO, QUE YA NO TIENE EQUIPO, Y PASARÁ A LA OTRA LISTA
  AlumnoBorrado(alumno: Alumno): Alumno[] {
    this.alumnosConEquipo = this.alumnosConEquipo.filter(res => res.id !== alumno.id);
    this.alumnosSinEquipo.push(alumno);
    return this.alumnosConEquipo;
  }

  BorrarAlumnoEquipo(alumno: Alumno) {
    console.log('voy a borrar a ' + alumno.id);
    // PRIMERO BUSCO LA ASIGNACIÓN QUE VINCULA EL ALUMNO CON ID QUE PASO COMO PARÁMETRO Y EL EQUIPO EN EL QUE ESTOY
    this.equipoService.GET_AsignacionEquipoAlumno(alumno.id, this.equipo.id, this.equipo.grupoId)
    .subscribe(asignacion => {
      console.log(asignacion);

      // UNA VEZ LO TENGO, BORRO ESA ASIGNACIÓN Y, POR TANTO, EL VÍNCULO ENTRE ALUMNO Y EQUIPO
      if (asignacion[0] !== undefined) {
        this.equipoService.DELETE_AlumnoEquipo(asignacion[0]).subscribe(res => {
          console.log(res);
          // SI SE BORRA CORRECTAMENTE NOS DEVUELVE NULL
          if (res === null) {
            console.log('eliminado correctamente');
            this.AlumnosDelEquipo(this.equipo.id); // ACTUALIZAMOS LA TABLA
            this.AlumnoBorrado(alumno); // ACTUALIZAMOS LA LISTA DE ALUMNOS CON/SIN EQUIPO
          } else {
            console.log('No se ha podido eliminar');
          }
        });
      } else {
        console.log('no se ha encontrado la asignación');
        }
      });
  }

    // SE ABRE EL DIÁLOGO PARA AÑADIR ALUMNOS AL EQUIPO
  AbrirDialogoAgregarAlumnosEquipo(): void {

    const dialogRef = this.dialog.open(AgregarAlumnoEquipoComponent, {
      width: '80%',
      height: 'auto',

      // LE ENVIAMOS LOS ALUMNOS QUE TIENE ACTUALMENTE EL EQUIPO Y LOS QUE PODEMOS AÑADIR, ADEMÁS DEL EQUIPO QUE NOS SERÁ
      // ÚTIL PARA SABER SU ID Y EL ID DEL GRUPO AL QUE PERTENCE
      data: {
        alumnosEquipo: this.alumnosEquipo,
        alumnosSinEquipo: this.alumnosSinEquipo,
        equipo: this.equipo
      }
    });

    // RECUPERAREMOS LA NUEVA LISTA DE LOS ALUMNOS ASIGNABLES Y VOLVEREMOS A BUSCAR LOS ALUMNOS QUE TIENE EL EQUIPO
    dialogRef.afterClosed().subscribe(alumnosEquipo => {

      // Si el usuario clica a aceptar para cerrar el dialogo, se enviarán los alumnos del equipo
      if (alumnosEquipo !== undefined) {
        this.alumnosEquipo = alumnosEquipo;

        // Si clica fuera del diálogo para cerrarlo, recuperaremos la lista de la base de datos
      } else {
        this.AlumnosDelEquipo(this.equipo.id);
      }

      // Limpiamos las listas que teniamos antes
      this.alumnosConEquipo = [];
      this.alumnosSinEquipo = [];

      // Volvemos a hacer la clasificación
      this.ClasificacionAlumnos();

    });
 }

 prueba() {
   console.log(this.alumnosSinEquipo);
   console.log(this.alumnosConEquipo);
   console.log(this.alumnosGrupo);
   console.log(this.alumnosEquipo);
 }

  // NOS DEVOLVERÁ A LA DE LA QUE VENIMOS
  goBack() {
    this.location.back();
  }
}
