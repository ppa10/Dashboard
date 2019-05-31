import { Component, OnInit } from '@angular/core';

// Clases
import { Alumno, Equipo, Juego, Punto, Nivel, AlumnoJuegoDePuntos, EquipoJuegoDePuntos, TablaJuegoDePuntos} from '../../../clases/index';

// Services
import { JuegoService, GrupoService } from '../../../servicios/index';


@Component({
  selector: 'app-juego-de-puntos-seleccionado-activo',
  templateUrl: './juego-de-puntos-seleccionado-activo.component.html',
  styleUrls: ['./juego-de-puntos-seleccionado-activo.component.css']
})
export class JuegoDePuntosSeleccionadoActivoComponent implements OnInit {

  juegoSeleccionado: Juego;

  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];
  puntosDelJuego: Punto[];
  nivelesDelJuego: Nivel[];

  listaOrdenadaPorPuntos: AlumnoJuegoDePuntos[];

  tablaJuegos: TablaJuegoDePuntos[] = [];

  displayedColumnsAlumnos: string[] = ['posicion', 'nombreAlumno', 'primerApellido', 'segundoApellido', 'puntos', 'nivel', ' '];

  constructor( private juegoService: JuegoService ) { }

  ngOnInit() {

    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();

    this.PuntosDelJuego();
    this.NivelesDelJuego();

    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.AlumnosDelJuego();
      this.RecuperarInscripcionesAlumnoJuego();
    } else {
      this.EquiposDelJuego();
    }
  }

  // Recupera los alumnos que pertenecen al juego
  AlumnosDelJuego() {
    this.juegoService.GET_AlumnosJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(alumnosJuego => {
      this.alumnosDelJuego = alumnosJuego;
    });
  }


  // Recupera los equipos que pertenecen al juego
  EquiposDelJuego() {
    this.juegoService.GET_EquiposJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(equiposJuego => {
      this.equiposDelJuego = equiposJuego;
    });
  }


  // Recupera los puntos que se pueden asignar al juego
  PuntosDelJuego() {
    this.juegoService.GET_PuntosJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(puntos => {
      this.puntosDelJuego = puntos;
    });
  }


  // Recupera los niveles de los que dispone el juego
  NivelesDelJuego() {
    this.juegoService.GET_NivelesJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(niveles => {
      this.nivelesDelJuego = niveles;
      console.log(this.nivelesDelJuego);
    });
  }


  // Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesAlumnoJuego() {
    this.juegoService.GET_InscripcionesAlumnoJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.listaOrdenadaPorPuntos = inscripciones;
      this.OrdenarPorPuntos();
      this.TablaClasificacion();
    });

  }

  OrdenarPorPuntos() {

    // tslint:disable-next-line:only-arrow-functions
    this.listaOrdenadaPorPuntos = this.listaOrdenadaPorPuntos.sort(function(obj1, obj2) {
      return obj2.PuntosTotalesAlumno - obj1.PuntosTotalesAlumno;
    });
    return this.listaOrdenadaPorPuntos;
  }

  TablaClasificacion() {

    if (this.juegoSeleccionado.Modo === 'Individual') {

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listaOrdenadaPorPuntos.length; i++) {
        let alumno: Alumno;
        let nivel: Nivel;

        alumno = this.BuscarAlumno(this.listaOrdenadaPorPuntos[i].alumnoId);

        if (this.listaOrdenadaPorPuntos[i].nivelId !== undefined) {
          console.log('Entro aqui');
          console.log(this.listaOrdenadaPorPuntos[i].alumnoId);
          nivel = this.BuscarNivel(this.listaOrdenadaPorPuntos[i].nivelId);
          console.log(this.listaOrdenadaPorPuntos[i].nivelId);
        }

        if (nivel !== undefined) {
          this.tablaJuegos[i] = new TablaJuegoDePuntos (i + 1, alumno.Nombre, alumno.PrimerApellido, alumno.SegundoApellido,
            this.listaOrdenadaPorPuntos[i].PuntosTotalesAlumno, nivel.Nombre);
        } else {
          this.tablaJuegos[i] = new TablaJuegoDePuntos (i + 1, alumno.Nombre, alumno.PrimerApellido, alumno.SegundoApellido,
            this.listaOrdenadaPorPuntos[i].PuntosTotalesAlumno);
        }

      }
    }

    this.tablaJuegos = this.tablaJuegos.filter(res => res.nombre !== '');

    return this.tablaJuegos;

  }

  BuscarAlumno(alumnoId: number): Alumno {

    let alumno: Alumno;
    // tslint:disable-next-line:no-unused-expression
    alumno = this.alumnosDelJuego.filter(res => res.id === alumnoId)[0];
    return alumno;
  }

  BuscarNivel(nivelId: number): Nivel {

    let nivel: Nivel;
    console.log(this.nivelesDelJuego.filter(res => res.id === nivelId)[0]);

    nivel = this.nivelesDelJuego.filter(res => res.id === nivelId)[0];

    return nivel;
  }

  Informacion() {

  }

  AsignarPuntos() {

  }


  prueba() {
    console.log(this.nivelesDelJuego);
  }

}
