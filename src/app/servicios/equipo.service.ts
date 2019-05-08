import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Clases
import { Equipo, Alumno, AsignacionEquipo } from '../clases/index';

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

  // Recuperamos las asignaciones (como la inscripción del alumno al equipo) de un grupo determinado
  AsignacionEquipoGrupo(grupoId: number): Observable<AsignacionEquipo[]> {
    return this.http.get<AsignacionEquipo[]>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos');
  }

  // ASIGNAR ALUMNOS A UN EQUIPO
  AgregarAlumnosEquipo(asignacionEquipos: AsignacionEquipo, grupoId: number): Observable<AsignacionEquipo> {
    return this.http.post<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos', asignacionEquipos);
  }

  // BUSCA Y ELIMINA A UN ALUMNO DE UN EQUIPO (BORRA ASIGNACIONEQUIPO)
  BorrarAlumnoEquipo(alumno: Alumno, equipoId: number, grupoId: number): Observable<AsignacionEquipo> {
    console.log('Entro a borrar' );
    return this.http.delete<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos?filter[where][equipoId]=' + equipoId +
    '&filter[where][alumnoId]=' + alumno.id);
  }

  TomaEquipo(equipo: any) {
    this.equipo = equipo;
  }

  DameEquipo(): any {
    return this.equipo;
  }
}
