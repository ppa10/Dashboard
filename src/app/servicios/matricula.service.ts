import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Clases
import { Matricula } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private APIUrl = 'http://localhost:3000/api/Matriculas';

  constructor( private http: HttpClient ) { }

  CrearMatricula(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.APIUrl, matricula);
  }
}
