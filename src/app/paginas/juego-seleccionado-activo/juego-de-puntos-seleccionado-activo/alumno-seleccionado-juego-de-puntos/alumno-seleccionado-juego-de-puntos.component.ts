import { Component, OnInit } from '@angular/core';

import { Alumno, Equipo, Juego, Punto, Nivel, AlumnoJuegoDePuntos, EquipoJuegoDePuntos,
  TablaAlumnoJuegoDePuntos, HistorialPuntosAlumno } from '../../../../clases/index';

// Services
import { JuegoService, GrupoService, AlumnoService } from '../../../../servicios/index';

@Component({
  selector: 'app-alumno-seleccionado-juego-de-puntos',
  templateUrl: './alumno-seleccionado-juego-de-puntos.component.html',
  styleUrls: ['./alumno-seleccionado-juego-de-puntos.component.css']
})
export class AlumnoSeleccionadoJuegoDePuntosComponent implements OnInit {

  juegoSeleccionado: Juego;
  alumnoSeleccionado: Alumno;

  // Recupera la informacion del juego, los alumnos o los equipos, los puntos y los niveles del juego
  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];
  puntosDelJuego: Punto[];
  nivelesDelJuego: Nivel[];


  constructor( private juegoService: JuegoService,
               private alumnoService: AlumnoService ) { }

  ngOnInit() {
    this.alumnoSeleccionado = this.alumnoService.RecibirAlumnoDelServicio();
    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();

    this.puntosDelJuego = this.juegoService.RecibirPuntosDelServicio();
    this.nivelesDelJuego = this.juegoService.RecibirNivelesDelServicio();
  }

  prueba() {
    console.log(this.alumnoSeleccionado);
  }
}
