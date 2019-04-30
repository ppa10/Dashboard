import { Injectable } from '@angular/core';
import {Observable, Subject , of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Clases
import { Profesor } from '../clases/index';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private APIUrl = 'http://localhost:3000/api/Profesores';
  public profesor: Profesor;
  profesorActual = new Subject();

  constructor( private http: HttpClient ) { }

  Autentificar(nombre: string, apellido: string): Observable<Profesor> {
    console.log('Entro a mostrar a ' + nombre + ' ' + apellido);
    return this.http.get<Profesor>(this.APIUrl + '?filter[where][Nombre]=' + nombre + '&filter[where][Apellido]=' + apellido);
  }

  PasarProfesor(profesor: Profesor) {
    this.profesorActual.next(profesor);
  }

}


