import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Juego } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor( private http: HttpClient ) { }

  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';

  juegoSeleccionado: Juego;


  GET_JuegoDePuntos(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos');
  }

  GET_JuegoDeColeccion(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions');
  }

  GET_JuegoDeCompeticion(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeCompeticions');
  }


  // Enviar y recibir juegos entre componentes

  // ESTA ES LA FUNCION QUE HAY QUE LLAMAR PARA ENVIAR EL JUEGO SELECIIONADO
  EnviarJuegoAlServicio(juego: any) {
    this.juegoSeleccionado = juego;
  }

  // ESTA ES LA QUE HAY QUE LLAMAR PARA RECOGER EL JUEGO EN OTRO COMPONENTE
  RecibirJuegoDelServicio(): any {
    return this.juegoSeleccionado;
  }
}
