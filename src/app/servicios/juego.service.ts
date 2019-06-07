import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Juego, AlumnoJuegoDePuntos, AsignacionPuntosJuego, Nivel, EquipoJuegoDePuntos, Alumno, Equipo, Punto,
         TablaAlumnoJuegoDePuntos, HistorialPuntosAlumno, HistorialPuntosEquipo, TablaEquipoJuegoDePuntos } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor( private http: HttpClient ) { }

  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';

  juegoSeleccionado: Juego;

  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];
  puntos: Punto[];
  niveles: Nivel[];

  // rankingSeleccionado: number;


  GET_JuegoDeColeccion(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions');
  }

  GET_JuegoDeCompeticion(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeCompeticions');
  }


  POST_JuegoDeColeccion(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions', juego);
  }

  POST_JuegoDeCompeticion(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeCompeticions', juego);
  }


  ///////////////////////////////////// PARA JUEGO DE PUNTOS ////////////////////////////////////////

  // Enviar y recibir juegos entre componentes

  // ESTA ES LA FUNCION QUE HAY QUE LLAMAR PARA ENVIAR EL JUEGO SELECIIONADO
  EnviarJuegoAlServicio(juego: any) {
    this.juegoSeleccionado = juego;
  }

  // ESTA ES LA QUE HAY QUE LLAMAR PARA RECOGER EL JUEGO EN OTRO COMPONENTE
  RecibirJuegoDelServicio(): any {
    return this.juegoSeleccionado;
  }

  EnviarAlumnoJuegoAlServicio(alumnos: any) {
    this.alumnosDelJuego = alumnos;
  }

  RecibirAlumnoJuegoDelServicio() {
    return this.alumnosDelJuego;
  }

  EnviarEquipoJuegoAlServicio(equipos: any) {
    this.equiposDelJuego = equipos;
  }

  RecibirEquipoJuegoDelServicio() {
    return this.equiposDelJuego;
  }

}
