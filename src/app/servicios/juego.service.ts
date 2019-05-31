import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Juego, AlumnoJuegoDePuntos, AsignacionPuntosJuego, Nivel } from '../clases/index';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor( private http: HttpClient ) { }

  private APIUrlGrupos = 'http://localhost:3000/api/Grupos';
  private APIURLPuntosJuego = 'http://localhost:3000/api/AsignacionPuntosJuego';
  private APIUrlAlumnoJuego = 'http://localhost:3000/api/AlumnoJuegosDePuntos';
  private APIRURLJuegoDePuntos = 'http://localhost:3000/api/JuegosDePuntos';
  private APIURLImagenNivel = 'http://localhost:3000/api/imagenes/imagenNivel';

  juegoSeleccionado: Juego;


  GET_JuegoDeColeccion(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions');
  }

  GET_JuegoDeCompeticion(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeCompeticions');
  }


  POST_JuegoDeColeccion(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeColeccions', juego);
  }

  POST_JuegoDeCompeticion(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDeCompeticions', juego);
  }


  ///////////////////////////////////// PARA JUEGO DE PUNTOS ////////////////////////////////////////

  GET_JuegoDePuntos(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos');
  }

  POST_JuegoDePuntos(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/juegoDePuntos', juego);
  }

  POST_AsignacionPuntoJuego(asignacionPuntoJuego: AsignacionPuntosJuego) {
    return this.http.post<AsignacionPuntosJuego>(this.APIURLPuntosJuego, asignacionPuntoJuego);
  }

  POST_AlumnoJuegoDePuntos(alumnoJuegoDePuntos: AlumnoJuegoDePuntos) {
    return this.http.post<AlumnoJuegoDePuntos>(this.APIUrlAlumnoJuego, alumnoJuegoDePuntos);
  }

  POST_Nivel(nivel: Nivel, juegoDePuntosId: number) {
    return this.http.post<Nivel>(this.APIRURLJuegoDePuntos + '/' + juegoDePuntosId + '/nivels', nivel);
  }

  POST_ImagenNivel(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIURLImagenNivel + '/upload', formData);
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
