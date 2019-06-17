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

  private APIUrl = 'http://localhost:3000/api/Colecciones';
  private APIUrlProfesor = 'http://localhost:3000/api/Profesores';
  private APIURLLogosColecciones = 'http://localhost:3000/api/imagenes/LogosColecciones';

  coleccion: Coleccion;
  cromo: Cromo;

  constructor(private http: HttpClient ) { }

  POST_Coleccion(coleccion: Coleccion, profesorId: number): Observable<Coleccion> {
    return this.http.post<Coleccion>(this.APIUrlProfesor + '/' + profesorId + '/coleccions', coleccion);
  }

  POST_LogoColecciones(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIURLLogosColecciones + '/upload', formData);
  }

  PUT_Coleccion(coleccion: Coleccion, profesorId: number, coleccionId: number): Observable<Coleccion> {
    return this.http.put<Coleccion>(this.APIUrlProfesor + '/' + profesorId + '/coleccions/' + coleccionId, coleccion);
  }

  DELETE_Coleccion(profesorId: number, coleccionId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesor + '/' + profesorId + '/coleccions/' + coleccionId);
  }

  GET_ColeccionesDelProfesor(profesorId: number): Observable<Coleccion[]> {
    return this.http.get<Coleccion[]>(this.APIUrlProfesor + '/' + profesorId + '/coleccions');
  }

  GET_CromosColeccion(coleccionId: number): Observable<Coleccion[]> {
    return this.http.get<Coleccion[]>(this.APIUrl + '/' + coleccionId + '/cromos');
  }

  POST_CromoColeccion(cromo: Cromo, coleccionId: number): Observable<Cromo> {
    return this.http.post<Cromo>(this.APIUrl + '/' + coleccionId + '/cromos', cromo);
  }
  DELETE_Cromo(cromoId: number, coleccionId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrl + '/' + coleccionId + '/cromos/' + cromoId);
  }
}
