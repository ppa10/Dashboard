import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';

// clase
import { Punto, Insignia } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class PuntosInsigniasService {

  private APIUrlProfesor = 'http://localhost:3000/api/Profesores';

  private APIURLImagenInsignia = 'http://localhost:3000/api/imagenes/ImagenInsignia';

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

  POST_Insignia(insignia: Insignia, profesorId: number): Observable<Insignia> {
    return this.http.post<Insignia>(this.APIUrlProfesor + '/' + profesorId + '/insignia', insignia);
  }

  DELETE_Insignia(insigniaId: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesor + '/' + profesorId + '/insignia/' + insigniaId);
  }

  POST_ImagenInsignia(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIURLImagenInsignia + '/upload', formData);
  }

  GET_Puntos(profesorId: number): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.APIUrlProfesor + '/' + profesorId + '/puntos');
  }

}
