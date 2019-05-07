import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// CLASES
import { Alumno } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private APIUrl = 'http://localhost:3000/api/';

  listaAlumnos: any = [];

  constructor(private http: HttpClient) { }


  TomaAlumnos(alumnos: any) {
    this.listaAlumnos = alumnos;
    console.log('he recibido los alumnos');
    console.log(this.listaAlumnos);
  }

  DameAlumnos(): any {
    return this.listaAlumnos;
    console.log('voy a enviar alumnos');
    console.log(this.listaAlumnos);
  }

}
