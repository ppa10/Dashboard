import { Injectable } from '@angular/core';
import { Grupo, Alumno } from '../clases/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private APIUrl = 'http://localhost:3000/api/Grupos';
  // public grupo: Grupo;

  constructor( private http: HttpClient ) { }



  MostrarAlumnosGrupo(grupoId: string): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrl + '/' + grupoId + '/alumnos');
  }

  // NumeroAlumnosGrupo(grupoId: string): Observable<number> {
  //   return this.http.get<number>(this.APIUrl + '/' + grupoId + '/alumnos/count');
  // }

}
