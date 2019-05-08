import { Injectable } from '@angular/core';
import {Observable, Subject , of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Clases
import { Profesor, Grupo, Alumno } from '../clases/index';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private APIUrl = 'http://localhost:3000/api/Profesores';
  public profesor: Profesor;
  profesorActual: any = [];
  profesorId: number;

  constructor( private http: HttpClient ) { }


  // FUNCIÓN TEMPORAL DE AUTENTIFICAR (PARA SIMPLIFICAR AHORA)
  Autentificar(nombre: string, apellido: string): Observable<Profesor> {
    console.log('Entro a mostrar a ' + nombre + ' ' + apellido);
    return this.http.get<Profesor>(this.APIUrl + '?filter[where][Nombre]=' + nombre + '&filter[where][Apellido]=' + apellido);
  }


  // BUSCA SI HAY ALGUN ALUMNO EN LA BASE DE DATOS CON ESE NOMBRE Y APELLIDOS
  BuscadorAlumno(alumno: Alumno, profesorId: number): Observable<Alumno> {
    console.log('Entro a buscar a ' + alumno.Nombre + ' ' + alumno.PrimerApellido + ' ' + alumno.SegundoApellido );
    return this.http.get<Alumno>(this.APIUrl + '/' + profesorId + '/alumnos?filter[where][Nombre]=' + alumno.Nombre +
    '&filter[where][PrimerApellido]=' + alumno.PrimerApellido + '&filter[where][SegundoApellido]=' + alumno.SegundoApellido);
  }

  // ASIGNAR ALUMNOS A UN PROFESOR
  AgregarAlumnosProfesor(alumno: Alumno, profesorId: number): Observable<Alumno> {
    return this.http.post<Alumno>(this.APIUrl + '/' + profesorId + '/alumnos', alumno);
  }

  GruposDelProfesor(profesorId: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.APIUrl + '/' + profesorId + '/grupos');
  }


  // Enviar y recibir profesores entre componentes

  // ESTA ES LA FUNCION QUE HAY QUE LLAMAR PARA ENVIAR AL PROFESOR QUE HA INICIADO SESIÓN
  TomaProfesor(profesor: any) {
    this.profesorActual = profesor;
  }

  // ESTA ES LA QUE HAY QUE LLAMAR PARA RECOGER EL PROFESOR EN OTRO COMPONENTE
  DameProfesor(): any {
    return this.profesorActual;
  }

  TomaProfesorId( profesorId: number) {
    this.profesorId = profesorId;
  }

  DameProfesorId(): number {
    return this.profesorId;
  }

}
