import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';

// clase
import { Punto } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {

  private APIUrlProfesor = 'http://localhost:3000/api/Profesores';

  constructor( private http: HttpClient ) { }

  POST_Punto(punto: Punto, profesorId: number): Observable<Punto> {
    return this.http.post<Punto>(this.APIUrlProfesor + '/' + profesorId + '/puntos', punto);
  }

  PUT_Punto(punto: Punto, profesorId: number, puntoId: number): Observable<Punto> {
    return this.http.put<Punto>(this.APIUrlProfesor + '/' + profesorId + '/puntos/' + puntoId, punto);
  }

  DELETE_Punto(puntoId: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesor + '/' + profesorId + '/puntos/' + puntoId);
  }
}
