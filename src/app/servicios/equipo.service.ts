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
  private APIURLLogosEquipos = 'http://localhost:3000/api/imagenes/LogosEquipos';
  equipo: Equipo;


  constructor( private http: HttpClient ) { }

  POST_Equipo(equipo: Equipo, grupoId: number): Observable<Equipo> {
    return this.http.post<Equipo>(this.APIUrlGrupos + '/' + grupoId + '/equipos', equipo);
  }

  POST_LogoEquipo(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIURLLogosEquipos + '/upload', formData);
  }

  PUT_Equipo(equipo: Equipo, grupoId: number, equipoId: number): Observable<Equipo> {
    return this.http.put<Equipo>(this.APIUrlGrupos + '/' + grupoId + '/equipos/' + equipoId, equipo);
  }

  GET_EquiposDelGrupo(grupoId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlGrupos + '/' + grupoId + '/equipos');
  }

  GET_LogoEquipo(logoEquipo: string): Observable<any> {
    return this.http.get<any>(this.APIURLLogosEquipos + '/download/' + logoEquipo);
  }

  DELETE_EquipoDelGrupo(equipo: Equipo): Observable<any> {
    return this.http.delete<any>(this.APIUrlGrupos + '/' + equipo.grupoId + '/equipos/' + equipo.id);
  }

  GET_AlumnosEquipo(equipoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrl + '/' + equipoId + '/alumnos');
  }

  // Recuperamos las asignaciones (como la inscripción del alumno al equipo) de un grupo determinado
  GET_AsignacionesEquipoDelGrupo(grupoId: number): Observable<AsignacionEquipo[]> {
    return this.http.get<AsignacionEquipo[]>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos');
  }

  // ASIGNAR ALUMNOS A UN EQUIPO
  POST_AlumnoEquipo(asignacionEquipos: AsignacionEquipo, grupoId: number): Observable<AsignacionEquipo> {
    return this.http.post<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos', asignacionEquipos);
  }

  // BUSCA Y ELIMINA A UN ALUMNO DE UN EQUIPO (BORRA ASIGNACIONEQUIPO)
  DELETE_AlumnoEquipo(asignacionEquipo: AsignacionEquipo): Observable<any> {
    console.log('voy a borrar asignacion ' + asignacionEquipo.id);
    return this.http.delete<any>(this.APIUrlGrupos + '/' + asignacionEquipo.grupoId + '/asignacionEquipos/'
    + asignacionEquipo.id);
  }

  GET_AsignacionEquipoAlumno(alumnoId: number, equipoId: number, grupoId: number): Observable<AsignacionEquipo> {
    console.log('Entro a buscar' );
    return this.http.get<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/asignacionEquipos?filter[where][equipoId]=' + equipoId +
    '&filter[where][alumnoId]=' + alumnoId);
  }

  GET_AsignacionesDelEquipo(equipo: Equipo): Observable<AsignacionEquipo[]> {
    console.log('Entro a buscar' );
    return this.http.get<AsignacionEquipo[]>(this.APIUrlGrupos + '/' + equipo.grupoId + '/asignacionEquipos?filter[where][equipoId]='
     + equipo.id);
  }




  // FUNCIONES PARA ENVIAR Y RECIBIR DATOS ENTRE COMPONENTES
  EnviarEquipoAlServicio(equipo: any) {
    this.equipo = equipo;
  }

  RecibirEquipoDelServicio(): any {
    return this.equipo;
  }
}
