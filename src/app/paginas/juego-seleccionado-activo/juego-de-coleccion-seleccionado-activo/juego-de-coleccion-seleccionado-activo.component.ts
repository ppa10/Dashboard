import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// Clases
import { Alumno, Equipo, Juego, AlumnoJuegoDeColeccion, EquipoJuegoDeColeccion, TablaAlumnoJuegoDeColeccion, Prueba
  } from '../../../clases/index';

// Services
import { JuegoService, EquipoService, AlumnoService, JuegoDePuntosService, ColeccionService} from '../../../servicios/index';

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

  pruebaTabla: Prueba[] = [];

  displayedColumnsAlumnos: string[] = ['nombreAlumno', 'primerApellido', 'segundoApellido', ' '];

  displayedColumnsEquipos: string[] = ['nombreEquipo', 'miembros', ' '];

  alumnosEquipo: Alumno[];

  inscripcionesAlumnos: AlumnoJuegoDeColeccion[];
  inscripcionesEquipos: EquipoJuegoDeColeccion[];

  tablaAlumno: TablaAlumnoJuegoDeColeccion[] = [];

  constructor( private juegoService: JuegoService,
               private alumnoService: AlumnoService,
               private equipoService: EquipoService,
               private coleccionService: ColeccionService,
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
      this.ColeccionDelJuego();
      this.juegoService.EnviarAlumnoJuegoAlServicio(this.alumnosDelJuego);
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
        this.tablaAlumno[i] = new TablaAlumnoJuegoDeColeccion (this.alumnosDelJuego[i].Nombre, this.alumnosDelJuego[i].PrimerApellido,
          this.alumnosDelJuego[i].SegundoApellido, numeroCromos.count, this.inscripcionesAlumnos[i].id);

        this.pruebaTabla[i] = new Prueba (this.alumnosDelJuego[i].Nombre, this.alumnosDelJuego[i].PrimerApellido,
          this.alumnosDelJuego[i].SegundoApellido, numeroCromos.count);
      });
      this.datasourceAlumno = new MatTableDataSource(this.alumnosDelJuego);


    }
  }
  // Recupera los equipos que pertenecen al juego
  EquiposDelJuego() {
    this.juegoService.GET_EquiposJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(equiposJuego => {
      this.equiposDelJuego = equiposJuego;
      console.log(equiposJuego);
      this.RecuperarInscripcionesEquiposJuego();
      this.ColeccionDelJuego();
      this.juegoService.EnviarEquipoJuegoAlServicio(this.equiposDelJuego);
    });
  }


    // Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesEquiposJuego() {

    this.juegoService.GET_InscripcionesEquipoJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.inscripcionesEquipos = inscripciones;
      console.log(this.inscripcionesEquipos);
      this.datasourceEquipo = new MatTableDataSource(this.equiposDelJuego);
      // this.OrdenarPorPuntosEquipos();
      // this.TablaClasificacionTotal();
    });
  }


  AlumnosDelEquipo(equipo: Equipo) {
    console.log(equipo);

    this.equipoService.GET_AlumnosEquipo(equipo.id)
    .subscribe(res => {
      if (res[0] !== undefined) {
        this.alumnosEquipo = res;
        console.log(res);
      } else {
        console.log('No hay alumnos en este equipo');
        this.alumnosEquipo = undefined;
      }
    });
  }


  AccederAlumno(alumno: Alumno) {

    this.alumnoService.EnviarAlumnoAlServicio(alumno);

    // tslint:disable-next-line:max-line-length
    this.juegoService.EnviarInscripcionAlServicio(this.inscripcionesAlumnos.filter(res => res.alumnoId === alumno.id)[0]);

  }


  AccederEquipo(equipo: Equipo) {

    this.equipoService.EnviarEquipoAlServicio(equipo);

    // tslint:disable-next-line:max-line-length
  //   this.juegoDePuntosService.EnviarInscripcionEquipoAlServicio(this.listaEquiposOrdenadaPorPuntos.filter(res => res.equipoId === equipoSeleccionado[0].id));
  //   this.juegoDePuntosService.EnviarPuntosAlServicio(this.puntosDelJuego);
  //   this.juegoDePuntosService.EnviarNivelesAlServicio(this.nivelesDelJuego);
  }

  // Le enviaremos solo la colección del juego
  Informacion() {


  }

  ColeccionDelJuego() {
    this.coleccionService.GET_Coleccion(this.juegoSeleccionado.coleccionId)
    .subscribe(coleccion => {
      console.log('voy a enviar la coleccion');
      this.coleccionService.EnviarColeccionAlServicio(coleccion);
    });
  }



  prueba() {
    console.log(this.juegoSeleccionado);

  }

}
