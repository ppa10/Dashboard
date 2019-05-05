import { Injectable } from '@angular/core';
import {Observable, Subject , of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Clases
import { Profesor, Grupo, Alumno, Matricula } from '../clases/index';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private APIUrl = 'http://localhost:3000/api/Profesores';
  public profesor: Profesor;
  profesorActual: any = [];

  constructor( private http: HttpClient ) { }


  // FUNCIÓN TEMPORAL DE AUTENTIFICAR (PARA SIMPLIFICAR AHORA)
  Autentificar(nombre: string, apellido: string): Observable<Profesor> {
    console.log('Entro a mostrar a ' + nombre + ' ' + apellido);
    return this.http.get<Profesor>(this.APIUrl + '?filter[where][Nombre]=' + nombre + '&filter[where][Apellido]=' + apellido);
  }

    // PERMITE CREAR UN GRUPO AL PROFESOR. DEVOLVEMOS UN OBSERVABLE GRUPO PARA SABER EL IDENTIFICADOR DEL GRUPO QUE ACABAMOS
  // DE CREAR POR SI DECIDIMOS TIRAR UN PASO HACIA ATRÁS EN EL MOMENTO DE CREAR Y MODIFICAR EL NOMBRE O LA DESCRIPCIÓN
  CrearGrupo(grupo: Grupo, profesorId: string): Observable<Grupo> {
    return this.http.post<Grupo>(this.APIUrl + '/' + profesorId + '/grupos', grupo);
  }

  // CUANDO EDITAMOS UN GRUPO LE PASAMOS EL NUEVO MODELO DEL GRUPO, EL IDENTIFICADOR DEL PROFESOR Y EL GRUPO EN CONCRETO
  // QUE QUEREMOS EDITAR
  EditarGrupo(grupo: Grupo, profesorId: string, grupoId: number): Observable<Grupo> {
    return this.http.put<Grupo>(this.APIUrl + '/' + profesorId + '/grupos/' + grupoId, grupo);
  }

  BuscadorAlumno(alumno: Alumno, profesorId: string): Observable<Alumno> {
    console.log('Entro a buscar a ' + alumno.Nombre + ' ' + alumno.PrimerApellido);
    return this.http.get<Alumno>(this.APIUrl + '/' + profesorId + '/alumnos?filter[where][Nombre]=' + alumno.Nombre +
    '&filter[where][PrimerApellido]=' + alumno.PrimerApellido + '&filter[where][SegundoApellido]=' + alumno.SegundoApellido);
  }

  // ASIGNAR ALUMNOS A UN PROFESOR
  AgregarAlumnosProfesor(alumno: Alumno, profesorId: string): Observable<Alumno> {
    return this.http.post<Alumno>(this.APIUrl + '/' + profesorId + '/alumnos', alumno);
  }

  GruposDelProfesor(profesorId: string): Observable<Grupo[]> {
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


}
