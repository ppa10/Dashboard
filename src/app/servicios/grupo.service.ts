import { Injectable } from '@angular/core';
import { Grupo, Alumno } from '../clases/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private APIUrl = 'http://localhost:3000/api/Grupos';
  private APIUrlProfesor = 'http://localhost:3000/api/Profesores';
  // public grupo: Grupo;

  constructor( private http: HttpClient ) { }


  // PERMITE CREAR UN GRUPO AL PROFESOR. DEVOLVEMOS UN OBSERVABLE GRUPO PARA SABER EL IDENTIFICADOR DEL GRUPO QUE ACABAMOS
  // DE CREAR POR SI DECIDIMOS TIRAR UN PASO HACIA ATRÁS EN EL MOMENTO DE CREAR Y MODIFICAR EL NOMBRE O LA DESCRIPCIÓN
  CrearGrupo(grupo: Grupo, profesorId: string): Observable<Grupo> {
    return this.http.post<Grupo>(this.APIUrlProfesor + '/' + profesorId + '/grupos', grupo);
  }

  // CUANDO EDITAMOS UN GRUPO LE PASAMOS EL NUEVO MODELO DEL GRUPO, EL IDENTIFICADOR DEL PROFESOR Y EL GRUPO EN CONCRETO
  // QUE QUEREMOS EDITAR
  EditarGrupo(grupo: Grupo, profesorId: string, grupoId: number): Observable<Grupo> {
    return this.http.put<Grupo>(this.APIUrlProfesor + '/' + profesorId + '/grupos/' + grupoId, grupo);
  }

  MostrarAlumnosGrupo(grupoId: string): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrl + '/' + grupoId + '/alumnos');
  }

  // NumeroAlumnosGrupo(grupoId: string): Observable<number> {
  //   return this.http.get<number>(this.APIUrl + '/' + grupoId + '/alumnos/count');
  // }

}
