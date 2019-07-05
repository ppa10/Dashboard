import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// Clases
import { Alumno, Equipo, Juego, AlumnoJuegoDeColeccion, EquipoJuegoDeColeccion, TablaAlumnoJuegoDeColeccion
  } from '../../../clases/index';

// Services
import { JuegoService, EquipoService, AlumnoService, JuegoDePuntosService } from '../../../servicios/index';

// Imports para abrir diálogo y snackbar
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogoConfirmacionComponent } from '../../COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-juego-de-coleccion-seleccionado-activo',
  templateUrl: './juego-de-coleccion-seleccionado-activo.component.html',
  styleUrls: ['./juego-de-coleccion-seleccionado-activo.component.scss']
})
export class JuegoDeColeccionSeleccionadoActivoComponent implements OnInit {

  // Juego De Puntos seleccionado
  juegoSeleccionado: Juego;

  // Recupera la informacion del juego, los alumnos o los equipos, los puntos y los niveles del juego
  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];

  // tslint:disable-next-line:no-inferrable-types
  mensaje: string = 'Estás seguro/a de que quieres desactivar el ';

  datasourceAlumno;
  datasourceEquipo;

  displayedColumnsAlumnos: string[] = ['nombreAlumno', 'primerApellido', 'segundoApellido', 'cromos', ' '];

  displayedColumnsEquipos: string[] = ['posicion', 'nombreEquipo', 'miembros', 'cromos', ' '];

  alumnosEquipo: Alumno[];

  inscripcionesAlumnos: AlumnoJuegoDeColeccion[];
  inscripcionesEquipos: EquipoJuegoDeColeccion[];

  tablaAlumno: TablaAlumnoJuegoDeColeccion[] = [];

  constructor( private juegoService: JuegoService,
               private alumnoService: AlumnoService,
               private equipoService: EquipoService,
               private juegoDePuntosService: JuegoDePuntosService,
               public dialog: MatDialog,
               public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();


    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.AlumnosDelJuego();
    } else {
      this.EquiposDelJuego();
    }
  }

  applyFilter(filterValue: string) {
    this.datasourceAlumno.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEquipo(filterValue: string) {
    this.datasourceEquipo.filter = filterValue.trim().toLowerCase();
  }

  // Recupera los alumnos que pertenecen al juego
  AlumnosDelJuego() {
    this.juegoService.GET_AlumnosJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(alumnosJuego => {
      console.log(alumnosJuego);
      this.alumnosDelJuego = alumnosJuego;
      this.RecuperarInscripcionesAlumnoJuego();
    });
  }


  // Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesAlumnoJuego() {
    this.juegoService.GET_InscripcionesAlumnoJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.inscripcionesAlumnos = inscripciones;
      console.log(this.inscripcionesAlumnos);
      this.RecuperarNumeroCromos();
    });
  }

  RecuperarNumeroCromos() {

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.inscripcionesAlumnos.length; i ++) {
      this.juegoService.GET_NumeroCromosAlumno(this.inscripcionesAlumnos[i].id)
      .subscribe(numeroCromos => {
        console.log(numeroCromos);
        this.tablaAlumno[i] = new TablaAlumnoJuegoDeColeccion(this.alumnosDelJuego[i].Nombre, this.alumnosDelJuego[i].PrimerApellido,
          this.alumnosDelJuego[i].SegundoApellido, numeroCromos.count, this.inscripcionesAlumnos[i].id);
      });
    }
    this.datasourceAlumno = new MatTableDataSource(this.tablaAlumno);
  }
  // Recupera los equipos que pertenecen al juego
  EquiposDelJuego() {
    this.juegoService.GET_EquiposJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(equiposJuego => {
      this.equiposDelJuego = equiposJuego;
      console.log(equiposJuego);
      this.RecuperarInscripcionesEquiposJuego();
    });
  }


    // Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesEquiposJuego() {

    this.juegoService.GET_InscripcionesEquipoJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.inscripcionesEquipos = inscripciones;
      console.log(this.inscripcionesEquipos);
      // this.OrdenarPorPuntosEquipos();
      // this.TablaClasificacionTotal();
    });
  }

  prueba() {
    console.log(this.tablaAlumno);

  }

}
