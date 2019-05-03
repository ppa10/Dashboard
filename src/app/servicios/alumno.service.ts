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

  constructor(private http: HttpClient) { }



}
