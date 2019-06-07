import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Juego, AlumnoJuegoDePuntos, AsignacionPuntosJuego, Nivel, EquipoJuegoDePuntos, Alumno, Equipo, Punto,
         TablaAlumnoJuegoDePuntos, HistorialPuntosAlumno, HistorialPuntosEquipo, TablaEquipoJuegoDePuntos } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class JuegoDePuntosService {

  constructor( private http: HttpClient ) { }

  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';
  private APIURLPuntosJuego = 'http://localhost:3000/api/AsignacionPuntosJuego';
  private APIUrlAlumnoJuego = 'http://localhost:3000/api/AlumnoJuegosDePuntos';
  private APIUrlEquipoJuego = 'http://localhost:3000/api/EquiposJuegosDePuntos';
  private APIRURLJuegoDePuntos = 'http://localhost:3000/api/JuegosDePuntos';
  private APIURLImagenNivel = 'http://localhost:3000/api/imagenes/imagenNivel';
  private APIURLAlumnoJuegoDePuntos = 'http://localhost:3000/api/AlumnoJuegosDePuntos';
  private APIURLHistorialPuntosAlumno = 'http://localhost:3000/api/HistorialesPuntosAlumno';

  private APIURLEquiposJuegoDePuntos = 'http://localhost:3000/api/EquiposJuegosDePuntos';
  private APIURLHistorialPuntosEquipo = 'http://localhost:3000/api/HistorialesPuntosEquipo';

  rankingJuegoDePunto: TablaAlumnoJuegoDePuntos[];
  listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDePuntos[];

  rankingEquipoJuegoDePuntos: TablaEquipoJuegoDePuntos[];
  listaEquiposOrdenadaPorPuntos: EquipoJuegoDePuntos[];

  inscripcionAlumnoJuego: AlumnoJuegoDePuntos;


  puntos: Punto[];
  niveles: Nivel[];


  GET_JuegoDePuntos(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos');
  }

  POST_JuegoDePuntos(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos', juego);
  }

  POST_AsignacionPuntoJuego(asignacionPuntoJuego: AsignacionPuntosJuego) {
    return this.http.post<AsignacionPuntosJuego>(this.APIURLPuntosJuego, asignacionPuntoJuego);
  }

  POST_AlumnoJuegoDePuntos(alumnoJuegoDePuntos: AlumnoJuegoDePuntos) {
    return this.http.post<AlumnoJuegoDePuntos>(this.APIUrlAlumnoJuego, alumnoJuegoDePuntos);
  }

  POST_EquipoJuegoDePuntos(equipoJuegoDePuntos: EquipoJuegoDePuntos) {
    return this.http.post<EquipoJuegoDePuntos>(this.APIUrlEquipoJuego, equipoJuegoDePuntos);
  }

  POST_Nivel(nivel: Nivel, juegoDePuntosId: number) {
    return this.http.post<Nivel>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/nivels', nivel);
  }

  POST_ImagenNivel(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIURLImagenNivel + '/upload', formData);
  }

  GET_AlumnosJuegoDePuntos(juegoDePuntosId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/alumnos');
  }

  GET_EquiposJuegoDePuntos(juegoDePuntosId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/equipos');
  }

  GET_PuntosJuegoDePuntos(juegoDePuntosId: number): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/puntos');
  }

  GET_NivelesJuegoDePuntos(juegoDePuntosId: number): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/nivels');
  }

  GET_InscripcionAlumnoJuegoDePuntos(alumnoId: number, juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
    return this.http.get<AlumnoJuegoDePuntos>(this.APIURLAlumnoJuegoDePuntos + '?filter[where][alumnoId]=' + alumnoId
    + '&filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  GET_InscripcionesAlumnoJuegoDePuntos(juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos[]> {
    return this.http.get<AlumnoJuegoDePuntos[]>(this.APIURLAlumnoJuegoDePuntos + '?filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  GET_InscripcionesEquipoJuegoDePuntos(juegoDePuntosId: number): Observable<EquipoJuegoDePuntos[]> {
    return this.http.get<EquipoJuegoDePuntos[]>(this.APIURLEquiposJuegoDePuntos + '?filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  PUT_PuntosJuegoDePuntos( alumnoJuegoDePuntos: AlumnoJuegoDePuntos, alumnoJuegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDePuntos>(this.APIURLAlumnoJuegoDePuntos + '/' + alumnoJuegoDePuntosId, alumnoJuegoDePuntos);
  }

  // tslint:disable-next-line:max-line-length
  PUT_PuntosEquiposJuegoDePuntos( equipoJuegoDePuntos: EquipoJuegoDePuntos, equipoJuegoDePuntosId: number): Observable<EquipoJuegoDePuntos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<EquipoJuegoDePuntos>(this.APIURLEquiposJuegoDePuntos + '/' + equipoJuegoDePuntosId, equipoJuegoDePuntos);
  }

  POST_HistorialPuntosAlumno(historial: HistorialPuntosAlumno): Observable<HistorialPuntosAlumno> {
    return this.http.post<HistorialPuntosAlumno>(this. APIURLHistorialPuntosAlumno, historial);
  }

  POST_HistorialPuntosEquipo(historial: HistorialPuntosEquipo): Observable<HistorialPuntosEquipo> {
    return this.http.post<HistorialPuntosEquipo>(this. APIURLHistorialPuntosEquipo, historial);
  }

  GET_HistorialDeUnPunto(alumnoJuegoDePuntosId: number, puntoId: number): Observable<HistorialPuntosAlumno[]> {
    return this.http.get<HistorialPuntosAlumno[]>(this.APIURLHistorialPuntosAlumno + '?filter[where][alumnoJuegoDePuntosId]='
     + alumnoJuegoDePuntosId + '&filter[where][puntoId]=' + puntoId);
  }

  GET_HistorialDeUnPuntoEquipo(equipoJuegoDePuntosId: number, puntoId: number): Observable<HistorialPuntosEquipo[]> {
    return this.http.get<HistorialPuntosEquipo[]>(this.APIURLHistorialPuntosEquipo + '?filter[where][equipoJuegoDePuntosId]='
     + equipoJuegoDePuntosId + '&filter[where][puntoId]=' + puntoId);
  }

  GET_HistorialPuntosAlumno(alumnoJuegoDePuntosId: number): Observable<HistorialPuntosAlumno[]> {
    return this.http.get<HistorialPuntosAlumno[]>(this.APIURLHistorialPuntosAlumno + '?filter[where][alumnoJuegoDePuntosId]='
     + alumnoJuegoDePuntosId);
  }

  DELETE_PuntosAlumno(historialPuntosAlumnoId: number): Observable<HistorialPuntosAlumno[]> {
    return this.http.delete<HistorialPuntosAlumno[]>(this.APIURLHistorialPuntosAlumno + '/' + historialPuntosAlumnoId);
  }




  EnviarListaOrdenadaJuegoPuntosAlServicio(lista: any) {
    this.listaAlumnosOrdenadaPorPuntos = lista;
  }

  RecibirListaOrdenadaJuegoPuntosDelServicio(): any {
    return this.listaAlumnosOrdenadaPorPuntos;
  }

  EnviarRankingJuegoPuntosAlServicio(ranking: any) {
    this.rankingJuegoDePunto = ranking;
  }

  RecibirRankingJuegoPuntosDelServicio(): any {
    return this.rankingJuegoDePunto;
  }

  EnviarListaEquiposOrdenadaJuegoPuntosAlServicio(lista: any) {
    this.listaEquiposOrdenadaPorPuntos = lista;
  }

  RecibirListaEquiposOrdenadaJuegoPuntosDelServicio(): any {
    return this.listaEquiposOrdenadaPorPuntos;
  }

  EnviarRankingEquipoJuegoPuntosAlServicio(ranking: any) {
    this.rankingEquipoJuegoDePuntos = ranking;
  }

  RecibirRankingEquipoJuegoPuntosDelServicio(): any {
    return this.rankingEquipoJuegoDePuntos;
  }

  EnviarPuntosAlServicio(puntos: any) {
    this.puntos = puntos;
  }

  RecibirPuntosDelServicio(): any {
    return this.puntos;
  }

  EnviarNivelesAlServicio(niveles: any) {
    this.niveles = niveles;
  }

  RecibirNivelesDelServicio(): any {
    return this.niveles;
  }

  EnviarInscripcionAlServicio(alumnoJuegoPuntos: any) {
    this.inscripcionAlumnoJuego = alumnoJuegoPuntos;
  }

  RecibirInscripcionDelServicio(): any {
    return this.inscripcionAlumnoJuego;
  }
}
