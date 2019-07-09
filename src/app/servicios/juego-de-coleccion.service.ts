import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Juego, AlumnoJuegoDeColeccion, EquipoJuegoDeColeccion, Alumno, Equipo,
         Album, AlbumEquipo, Cromo } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class JuegoDeColeccionService {

  constructor( private http: HttpClient ) { }

  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';

  private APIURLAlumnoJuegoDeColeccion = 'http://localhost:3000/api/AlumnosJuegoDeColeccion';
  private APIURLEquipoJuegoDeColeccion = 'http://localhost:3000/api/EquiposJuegoDeColeccion';

  private APIRURLJuegoDeColeccion = 'http://localhost:3000/api/JuegosDeColeccion';

  private APIRURLAlbum = 'http://localhost:3000/api/Albumes';
  private APIRURLAlbumEquipo = 'http://localhost:3000/api/albumsEquipo';



  POST_AlumnoJuegoDeColeccion(alumnoJuegoDeColeccion: AlumnoJuegoDeColeccion) {
    return this.http.post<AlumnoJuegoDeColeccion>(this.APIURLAlumnoJuegoDeColeccion, alumnoJuegoDeColeccion);
  }

  POST_EquipoJuegoDeColeccion(equipoJuegoDeColeccion: EquipoJuegoDeColeccion) {
    return this.http.post<EquipoJuegoDeColeccion>(this.APIURLEquipoJuegoDeColeccion, equipoJuegoDeColeccion);
  }


  GET_AlumnosJuegoDeColeccion(juegoDeColeccionId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIRURLJuegoDeColeccion + '/' + juegoDeColeccionId + '/alumnos');
  }

  GET_EquiposJuegoDeColeccion(juegoDeColeccionId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIRURLJuegoDeColeccion + '/' + juegoDeColeccionId + '/equipos');
  }

  GET_NumeroCromosAlumno(alumnoJuegoDeColeccionId: number): Observable<any> {
    return this.http.get<any>(this.APIURLAlumnoJuegoDeColeccion + '/' +  alumnoJuegoDeColeccionId + '/cromos/count');
  }

  GET_InscripcionesAlumnoJuegoDeColeccion(juegoDeColeccionId: number): Observable<AlumnoJuegoDeColeccion[]> {
    return this.http.get<AlumnoJuegoDeColeccion[]>(this.APIURLAlumnoJuegoDeColeccion + '?filter[where][juegoDeColeccionId]='
    + juegoDeColeccionId);
  }

  GET_InscripcionesEquipoJuegoDeColeccion(juegoDeColeccionId: number): Observable<EquipoJuegoDeColeccion[]> {
    return this.http.get<EquipoJuegoDeColeccion[]>(this.APIURLEquipoJuegoDeColeccion + '?filter[where][juegoDeColeccionId]='
    + juegoDeColeccionId);
  }

  POST_AsignarCromoAlumno(album: Album) {
    return this.http.post<Album>(this.APIRURLAlbum, album);
  }


  POST_AsignarCromoEquipo(album: AlbumEquipo) {
    return this.http.post<AlbumEquipo>(this.APIRURLAlbumEquipo, album);
  }

  GET_CromosAlumno(alumnoJuegoDeColeccionId: number): Observable<Cromo[]> {
    return this.http.get<Cromo[]>(this.APIURLAlumnoJuegoDeColeccion + '/' + alumnoJuegoDeColeccionId + '/cromos');
  }

  GET_CromosEquipo(equipoJuegoDeColeccionId: number): Observable<Cromo[]> {
    return this.http.get<Cromo[]>(this.APIURLEquipoJuegoDeColeccion + '/' + equipoJuegoDeColeccionId + '/cromos');
  }

  PUT_EstadoJuegoDeColeccion(juegoDeColeccion: Juego, juegoDeColeccionId: number, grupoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions/' + juegoDeColeccionId, juegoDeColeccion);
  }

  DELETE_JuegoDeColeccion(juegoDeColeccionId: number, grupoId: number): Observable<Juego> {
    return this.http.delete<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions/' + juegoDeColeccionId);
  }
}
