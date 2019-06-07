import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// CLASES
import { Coleccion, Cromo } from '../clases/index';
import { core } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ColeccionService {

  private APIUrl = 'http://localhost:3000/api/Coleccion';
  private APIUrlProfesor = 'http://localhost:3000/api/Profesores';
  private APIURLLogosColecciones = 'http://localhost:3000/api/imagenes/LogosColecciones';

  coleccion: Coleccion;

  constructor(private http: HttpClient ) { }

  POST_Coleccion(coleccion: Coleccion, profesorId: number): Observable<Coleccion> {
    return this.http.post<Coleccion>(this.APIUrlProfesor + '/' + profesorId + '/colecciones', coleccion);
  }

  POST_LogoColecciones(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIURLLogosColecciones + '/upload', formData);
  }

  PUT_Coleccion(coleccion: Coleccion, profesorId: number, coleccionId: number): Observable<Coleccion> {
    return this.http.put<Coleccion>(this.APIUrlProfesor + '/' + profesorId + '/colecciones/' + coleccionId, coleccion);
  }

  DELETE_Coleccion(profesorId: number, coleccionId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesor + '/' + profesorId + '/colecciones/' + coleccionId);
  }

  GET_ColeccionesDelProfesor(profesorId: number): Observable<Coleccion[]> {
    return this.http.get<Coleccion[]>(this.APIUrlProfesor + '/' + profesorId + '/colecciones');
  }

  GET_CromosColeccion(coleccionId: number): Observable<Coleccion[]> {
    return this.http.get<Coleccion[]>(this.APIUrl + '/' + coleccionId + '/cromos');
  }

  // POST_CromoColeccion(asignacionEquipos: AsignacionEquipo, grupoId: number): Observable<AsignacionEquipo> {
  //   return this.http.post<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos', asignacionEquipos);
  // }
}
