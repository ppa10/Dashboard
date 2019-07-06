import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Juego, AlumnoJuegoDeColeccion, AsignacionPuntosJuego, Nivel, EquipoJuegoDeColeccion, Alumno, Equipo, Punto,
         Album, AlbumEquipo, HistorialPuntosEquipo, TablaEquipoJuegoDePuntos } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor( private http: HttpClient ) { }

  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';

  private APIUrlAlumnoJuego = 'http://localhost:3000/api/AlumnosJuegoDeColeccion';
  private APIUrlEquipoJuego = 'http://localhost:3000/api/EquiposJuegoDeColeccion';

  private APIRURLJuegoDeColeccion = 'http://localhost:3000/api/JuegosDeColeccion';

  private APIURLAlumnoJuegoDeColeccion = 'http://localhost:3000/api/AlumnosJuegoDeColeccion';
  private APIURLEquiposJuegoDeColeccion = 'http://localhost:3000/api/EquiposJuegoDeColeccion';

  private APIURLNumeroCromosAlumno = 'http://localhost:3000/api/AlumnosJuegoDeColeccion/';

  private APIRURLAlbum = 'http://localhost:3000/api/Albumes';
  private APIRURLAlbumEquipo = 'http://localhost:3000/api/albumsEquipo';
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

  PUT_JuegoDeColeccion(juego: Juego, grupoId: number, juegoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions/' + juegoId, juego);
  }


  POST_AlumnoJuegoDeColeccion(alumnoJuegoDeColeccion: AlumnoJuegoDeColeccion) {
    return this.http.post<AlumnoJuegoDeColeccion>(this.APIUrlAlumnoJuego, alumnoJuegoDeColeccion);
  }

  POST_EquipoJuegoDeColeccion(equipoJuegoDeColeccion: EquipoJuegoDeColeccion) {
    return this.http.post<EquipoJuegoDeColeccion>(this.APIUrlEquipoJuego, equipoJuegoDeColeccion);
  }


  GET_AlumnosJuegoDeColeccion(juegoDeColeccionId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIRURLJuegoDeColeccion + '/' + juegoDeColeccionId + '/alumnos');
  }

  GET_EquiposJuegoDeColeccion(juegoDeColeccionId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIRURLJuegoDeColeccion + '/' + juegoDeColeccionId + '/equipos');
  }

  // GET_InscripcionAlumnoJuegoDePuntos(alumnoId: number, juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
  //   return this.http.get<AlumnoJuegoDeColeccion>(this.APIURLAlumnoJuegoDePuntos + '?filter[where][alumnoId]=' + alumnoId
  //   + '&filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  // }

  GET_NumeroCromosAlumno(alumnoJuegoDeColeccionId: number): Observable<any> {
    return this.http.get<any>(this.APIURLNumeroCromosAlumno +  alumnoJuegoDeColeccionId + '/cromos/count');
  }

  GET_InscripcionesAlumnoJuegoDeColeccion(juegoDeColeccionId: number): Observable<AlumnoJuegoDeColeccion[]> {
    return this.http.get<AlumnoJuegoDeColeccion[]>(this.APIURLAlumnoJuegoDeColeccion + '?filter[where][juegoDeColeccionId]='
    + juegoDeColeccionId);
  }

  GET_InscripcionesEquipoJuegoDeColeccion(juegoDeColeccionId: number): Observable<EquipoJuegoDeColeccion[]> {
    return this.http.get<EquipoJuegoDeColeccion[]>(this.APIURLEquiposJuegoDeColeccion + '?filter[where][juegoDeColeccionId]='
    + juegoDeColeccionId);
  }

  POST_AsignarCromoAlumno(album: Album) {
    return this.http.post<Album>(this.APIRURLAlbum, album);
  }

  POST_AsignarCromoEquipo(album: AlbumEquipo) {
    return this.http.post<AlbumEquipo>(this.APIRURLAlbumEquipo, album);
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
