import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Juego, AlumnoJuegoDeColeccion, AsignacionPuntosJuego, Nivel, EquipoJuegoDeColeccion, Alumno, Equipo, Punto,
         Album, AlbumEquipo, HistorialPuntosEquipo, TablaEquipoJuegoDePuntos, Cromo } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor( private http: HttpClient ) { }

  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';




  juegoSeleccionado: Juego;

  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];


  inscripcionAlumno: AlumnoJuegoDeColeccion;
  inscripcionEquipo: EquipoJuegoDeColeccion;

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

  PUT_JuegoDeColeccion(juego: Juego, grupoId: number, juegoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions/' + juegoId, juego);
  }



  // GET_InscripcionAlumnoJuegoDePuntos(alumnoId: number, juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
  //   return this.http.get<AlumnoJuegoDeColeccion>(this.APIURLAlumnoJuegoDePuntos + '?filter[where][alumnoId]=' + alumnoId
  //   + '&filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  // }



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

  EnviarInscripcionAlServicio(inscripcionAlumno: any) {
    this.inscripcionAlumno = inscripcionAlumno;
  }

  RecibirInscripcionAlumnoDelServicio() {
    return this.inscripcionAlumno;
  }

  EnviarInscripcionEquipoAlServicio(inscripcionEquipo: any) {
    this.inscripcionEquipo = inscripcionEquipo;
  }

  RecibirInscripcionEquipoDelServicio() {
    return this.inscripcionEquipo;
  }

}
