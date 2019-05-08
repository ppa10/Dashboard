import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Clases
import { Equipo, Alumno } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private APIUrl = 'http://localhost:3000/api/Equipos';
  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';
  equipo: Equipo;


  constructor( private http: HttpClient ) { }

  EquiposDelGrupo(grupoId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlGrupos + '/' + grupoId + '/equipos');
  }

  MostrarAlumnosEquipo(equipoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrl + '/' + equipoId + '/alumnos');
  }

  TomaEquipo(equipo: any) {
    this.equipo = equipo;
  }

  DameEquipo(): any {
    return this.equipo;
  }
}
