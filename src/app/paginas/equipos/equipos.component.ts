import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Imports para abrir diálogo confirmar eliminar equipo
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogoConfirmacionComponent } from '../COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';

// Clases
import { Equipo, Alumno } from '../../clases/index';

// Servicios
import { GrupoService, EquipoService, AlumnoService } from '../../servicios/index';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  listaEquipos: Equipo[];

  grupoId: number;

  alumnosEquipo: Alumno[];

  // tslint:disable-next-line:no-inferrable-types
  mensaje: string = 'Estás seguro/a de que quieres eliminar el equipo llamado: ';


  constructor( private grupoService: GrupoService,
               private equipoService: EquipoService,
               public dialog: MatDialog,
               public snackBar: MatSnackBar,
               private alumnoService: AlumnoService,
               private location: Location ) { }

  ngOnInit() {
    this.grupoId = this.grupoService.RecibirGrupoIdDelServicio();
    this.EquiposDelGrupo();
    console.log('inicio componente equipo');
  }


    // LE PASAMOS EL IDENTIFICADOR DEL PROFESOR Y NOS DEVUELVE UNA LISTA CON LOS GRUPOS QUE TIENE
  EquiposDelGrupo() {
    console.log('Voy a listar los equipos');
    this.equipoService.GET_EquiposDelGrupo(this.grupoId)
    .subscribe(res => {
      if (res[0] !== undefined) {
        console.log('Voy a dar la lista de equipos');
        this.listaEquipos = res;
        console.log(this.listaEquipos);
      } else {
        console.log('Este grupo no tiene equipos');
      }
    });
  }

  // LE PASAMOS EL IDENTIFICADOR DEL GRUPO Y BUSCAMOS LOS ALUMNOS QUE TIENE
  AlumnosDelEquipo(equipoId: number) {
    console.log('voy a mostrar los alumnos del equipo ' + equipoId);

    this.equipoService.GET_AlumnosEquipo(equipoId)
    .subscribe(res => {
      this.alumnosEquipo = res;
      if (res[0] !== undefined) {
        this.alumnosEquipo = res;
        console.log(res);
      } else {
        console.log('No hay alumnos en este equipo');
        this.alumnosEquipo = undefined;
      }
    });
  }

  // ENVÍA EL EQUIPO Y LOS ALUMNOS DE UN EQUIPO ESPECIFICO AL COMPONENTE EDITAR-EQUIPO
  EnviarEquipoEditar(equipo: Equipo, alumnosEquipo: Alumno[]) {
    console.log('voy a enviar');
    this.equipoService.EnviarEquipoAlServicio(equipo);
    console.log(alumnosEquipo);
    if (alumnosEquipo !== undefined) {
      console.log('entro aqui');
      this.alumnoService.EnviarListaAlumnosAlServicio(alumnosEquipo);
    } else {
      this.alumnoService.EnviarListaAlumnosAlServicio(alumnosEquipo);
      console.log('no hay alumnos en este equipo');
    }
  }

  // ESTA FUNCIÓN BORRARÁ EL EQUIPO QUE PASEMOS Y ACTUALIZARÁ LA LISTA
  EliminarEquipo(equipo: Equipo) {
    console.log('Voy a eliminar el equipo');
    this.equipoService.DELETE_EquipoDelGrupo(equipo)
    .subscribe(() => {
      console.log('Borrado correctamente');
      console.log('Voy a por las asignaciones');
      // Borro las asignaicones del equipo ya que no van a servir
      this.EliminarAsignacionesEquipo(equipo);

      // Actualizo la tabla de grupos
      this.EquiposDelGrupo();

    });
  }

  // ESTA FUNCIÓN RECUPERA TODAS LAS ASIGNACIONES DEL EQUIPO QUE VAMOS A BORRAR Y DESPUÉS LAS BORRA.
  // ESTO LO HACEMOS PARA NO DEJAR ASIGNACIONES A EQUIPOS QUE NO NOS SIRVEN EN LA BASE DE DATOS
  EliminarAsignacionesEquipo(equipo: Equipo) {
    this.equipoService.GET_AsignacionesDelEquipo(equipo)
    .subscribe(asignaciones => {
      console.log(asignaciones);

      if (asignaciones[0] !== undefined) {
        console.log('he recibido las asignaciones');

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < asignaciones.length; i++) {
          this.equipoService.DELETE_AlumnoEquipo(asignaciones[i])
          .subscribe(() => {
            console.log('asginacion borrada');
          });
        }
      } else {
        console.log('No hay asignaciones a equipos');
      }
    });
  }


  // SI QUEREMOS BORRA UN GRUPO, ANTES NOS SALDRÁ UN AVISO PARA CONFIRMAR LA ACCIÓN COMO MEDIDA DE SEGURIDAD. ESTO SE HARÁ
  // MEDIANTE UN DIÁLOGO
  AbrirDialogoConfirmacionBorrar(equipo: Equipo): void {

    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      height: '150px',
      data: {
        mensaje: this.mensaje,
        nombre: equipo.Nombre,
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.EliminarEquipo(equipo);
        this.snackBar.open(equipo.Nombre + ' eliminado correctamente', 'Cerrar', {
          duration: 2000,
        });

      }
    });
  }

  // NOS DEVOLVERÁ A LA DE LA QUE VENIMOS
  goBack() {
    this.location.back();
  }
}
