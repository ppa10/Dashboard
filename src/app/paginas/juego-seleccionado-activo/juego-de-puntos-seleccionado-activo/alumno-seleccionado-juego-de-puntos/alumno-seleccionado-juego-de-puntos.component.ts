import { Component, OnInit } from '@angular/core';

import { Alumno, Equipo, Juego, Punto, Nivel, AlumnoJuegoDePuntos, EquipoJuegoDePuntos,
  TablaAlumnoJuegoDePuntos, HistorialPuntosAlumno } from '../../../../clases/index';

// Services
import { JuegoService, GrupoService, AlumnoService } from '../../../../servicios/index';

@Component({
  selector: 'app-alumno-seleccionado-juego-de-puntos',
  templateUrl: './alumno-seleccionado-juego-de-puntos.component.html',
  styleUrls: ['./alumno-seleccionado-juego-de-puntos.component.scss']
})
export class AlumnoSeleccionadoJuegoDePuntosComponent implements OnInit {

  juegoSeleccionado: Juego;
  alumnoSeleccionado: Alumno;
  alumnoJuegoDePuntos: AlumnoJuegoDePuntos;

  // Recupera la informacion del juego, los alumnos o los equipos, los puntos y los niveles del juego
  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];
  puntosDelJuego: Punto[];
  nivelesDelJuego: Nivel[];

  nivel: Nivel;
  siguienteNivel: Nivel;


  constructor( private juegoService: JuegoService,
               private alumnoService: AlumnoService ) { }

  ngOnInit() {
    this.nivelesDelJuego = this.juegoService.RecibirNivelesDelServicio();
    this.alumnoSeleccionado = this.alumnoService.RecibirAlumnoDelServicio();
    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();
    this.alumnoJuegoDePuntos = this.juegoService.RecibirInscripcionDelServicio();

    this.puntosDelJuego = this.juegoService.RecibirPuntosDelServicio();

    this.Nivel();
  }

  prueba() {
    console.log(this.nivelesDelJuego);
    console.log(this.alumnoJuegoDePuntos);
    console.log(this.nivel);
    console.log(this.porcentaje());
  }

  Nivel() {

    this.OrdenarNiveles();
    this.nivel = this.BuscarNivelActual(this.alumnoJuegoDePuntos[0].nivelId);


    // Si el alumno ya ha alcanzado algun nivel, buscamos cual es el siguiente nivel del que ya tiene. Sino el siguiente
    // nivel será el primero
    if (this.alumnoJuegoDePuntos[0].nivelId !== undefined) {
      this.siguienteNivel = this.BuscarSiguienteNivel(this.alumnoJuegoDePuntos[0].nivelId);
      this.porcentaje();
    } else {
      console.log(this.nivelesDelJuego[0]);
      this.siguienteNivel = this.nivelesDelJuego[0];
      this.porcentaje();
    }
  }

  OrdenarNiveles() {

    // tslint:disable-next-line:only-arrow-functions
    this.nivelesDelJuego = this.nivelesDelJuego.sort(function(obj1, obj2) {
      return obj1.PuntosAlcanzar - obj2.PuntosAlcanzar;
    });
    return this.nivelesDelJuego;
  }

  BuscarSiguienteNivel(nivelId: number): Nivel {

    console.log('Voy a buscar el siguiente nivel');
    // tslint:disable-next-line:no-inferrable-types
    let encontrado: boolean = false;
    let i = 0;
    while ((i < this.nivelesDelJuego.length) && (encontrado === false)) {

      if (this.nivelesDelJuego[i].id === nivelId) {
        encontrado = true;
      }
      i = i + 1;
    }

    return this.nivelesDelJuego[i];
  }

  BuscarNivelActual(nivelId: number): Nivel {

    console.log(this.nivelesDelJuego.filter(res => res.id === nivelId)[0]);

    this.nivel = this.nivelesDelJuego.filter(res => res.id === nivelId)[0];

    return this.nivel;
  }

  porcentaje(): number {

    let porcentaje: number;

    if (this.nivel === undefined) {
      porcentaje = (this.alumnoJuegoDePuntos[0].PuntosTotalesAlumno - 0) / (this.siguienteNivel.PuntosAlcanzar - 0);

    } else {
      porcentaje = (this.alumnoJuegoDePuntos[0].PuntosTotalesAlumno - this.nivel.PuntosAlcanzar) /
      (this.siguienteNivel.PuntosAlcanzar - this.nivel.PuntosAlcanzar);
    }

    return porcentaje;
  }
}
