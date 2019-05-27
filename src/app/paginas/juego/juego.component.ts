import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ThemePalette } from '@angular/material/core';

// Clases
import { Alumno, Equipo, Juego} from '../../clases/index';

// Services
import { JuegoService, GrupoService } from '../../servicios/index';

export interface OpcionSeleccionada {
  nombre: string;
  id: string;
}

export interface ChipColor {
  nombre: string;
  color: ThemePalette;
}



@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  opcionesMostrar: OpcionSeleccionada[] = [
    {nombre: 'Todos los juegos', id: 'todosLosJuegos'},
    {nombre: 'Juegos de puntos', id: 'juegosDePuntos'},
    {nombre: 'Juegos de colección', id: 'juegosDeColeccion'},
    {nombre: 'Juegos de competición', id: 'juegosDeCompeticion'},

  ];

  seleccionTipoJuego: ChipColor[] = [
    {nombre: 'Juego De Puntos', color: 'primary'},
    {nombre: 'Juego De Colección', color: 'accent'},
    {nombre: 'Juego De Competición', color: 'warn'}
  ];

  seleccionModoJuego: ChipColor[] = [
    {nombre: 'Individual', color: 'primary'},
    {nombre: 'Equipos', color: 'accent'}
  ];



  juegosDePuntos: Juego[];
  juegosDeColeccion: Juego[];
  juegosDeCompeticion: Juego[];

  juegosDePuntosActivos: Juego[] = [];
  juegosDePuntosInactivos: Juego[] = [];

  juegosDeColeccionActivos: Juego[] = [];
  juegosDeColeccionInactivos: Juego[] = [];

  juegosDeCompeticionActivos: Juego[] = [];
  juegosDeCompeticionInactivos: Juego[] = [];

  todosLosJuegosActivos: Juego[] = [];
  todosLosJuegosInactivos: Juego[] = [];

  grupoId: number;
  alumnosGrupo: Alumno[];

  // tslint:disable-next-line:no-inferrable-types
  opcionSeleccionada: string = 'todosLosJuegos';

  ListaJuegosSeleccionadoActivo: Juego[];

  ListaJuegosSeleccionadoInactivo: Juego[];

  tipoDeJuegoSeleccionado: string;
  modoDeJuegoSeleccionado: string;

  // tslint:disable-next-line:ban-types
  isDisabled: Boolean = true;




  constructor( private location: Location,
               private juegoService: JuegoService,
               private grupoService: GrupoService ) { }

  ngOnInit() {
    this.grupoId = this.grupoService.RecibirGrupoIdDelServicio();
    this.alumnosGrupo = this.grupoService.RecibirAlumnosGrupoDelServicio();



    this.ListaJuegosDePuntos();
  }



  ListaJuegosDePuntos() {
    this.juegoService.GET_JuegoDePuntos(this.grupoId)
    .subscribe(juegos => {
      console.log('He recibido los juegos de puntos');

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < juegos.length; i++) {
        if (juegos[i].JuegoActivo === true) {
          this.juegosDePuntosActivos.push(juegos[i]);
        } else {
          this.juegosDePuntosInactivos.push(juegos[i]);
        }
      }
      this.ListaJuegosDeColeccion();
    });
  }

  ListaJuegosDeColeccion() {
    this.juegoService.GET_JuegoDeColeccion(this.grupoId)
    .subscribe(juegos => {
      console.log('He recibido los juegos de coleccion');

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < juegos.length; i++) {
        if (juegos[i].JuegoActivo === true) {
          this.juegosDeColeccionActivos.push(juegos[i]);
        } else {
          this.juegosDeColeccionInactivos.push(juegos[i]);
        }
      }
      this.ListaJuegosTotales();
    });
  }

  ListaJuegosTotales() {

    for (let i = 0; i < (this.juegosDePuntosActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDePuntosActivos[i]);
    }

    for (let i = 0; i < (this.juegosDePuntosInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDePuntosInactivos[i]);
    }

    for (let i = 0; i < (this.juegosDeColeccionActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDeColeccionActivos[i]);
    }

    for (let i = 0; i < (this.juegosDeColeccionInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDeColeccionInactivos[i]);
    }

    for (let i = 0; i < (this.juegosDeCompeticionActivos.length); i++ ) {
      this.todosLosJuegosActivos.push(this.juegosDeCompeticionActivos[i]);
    }

    for (let i = 0; i < (this.juegosDeCompeticionInactivos.length); i++ ) {
      this.todosLosJuegosInactivos.push(this.juegosDeCompeticionInactivos[i]);
    }

    // Por defecto al principio mostraremos la lista de todos los juegos
    this.ListaJuegosSeleccionadoActivo = this.todosLosJuegosActivos;
    this.ListaJuegosSeleccionadoInactivo = this.todosLosJuegosInactivos;
  }

  ListaJuegoSeleccionado() {

    console.log('Busquemos la lista correspondiente');
    console.log(this.opcionSeleccionada);

    if (this.opcionSeleccionada === 'todosLosJuegos') {
      this.ListaJuegosSeleccionadoActivo = this.todosLosJuegosActivos;
      this.ListaJuegosSeleccionadoInactivo = this.todosLosJuegosInactivos;
      console.log('todos los juegos');
    }
    if (this.opcionSeleccionada === 'juegosDePuntos') {
      this.ListaJuegosSeleccionadoActivo = this.juegosDePuntosActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDePuntosInactivos;
      console.log('juego de puntos');

    }

    if (this.opcionSeleccionada === 'juegosDeColeccion') {
      this.ListaJuegosSeleccionadoActivo = this.juegosDeColeccionActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDeColeccionInactivos;
      console.log('juego de coleccion');
    }

    if (this.opcionSeleccionada === 'juegosDeCompeticion') {

      this.ListaJuegosSeleccionadoActivo = this.juegosDeCompeticionActivos;
      this.ListaJuegosSeleccionadoInactivo = this.juegosDeCompeticionInactivos;
      console.log('juego de competicion');

    }

  }

  prueba() {
    console.log();

  }

  TipoDeJuegoSeleccionado(tipo: ChipColor) {
    this.tipoDeJuegoSeleccionado = tipo.nombre;
    console.log(this.tipoDeJuegoSeleccionado);
    this.isDisabled = false;
  }

  ModoDeJuegoSeleccionado(modo: ChipColor) {
    this.modoDeJuegoSeleccionado = modo.nombre;
    console.log(this.modoDeJuegoSeleccionado);
  }

  JuegoSeleccionado(juego: Juego) {
    this.juegoService.EnviarJuegoAlServicio(juego);
  }

  CrearJuegoDePuntos() {
    this.juegoService.POST_JuegoDePuntos(new Juego (this.tipoDeJuegoSeleccionado, this.modoDeJuegoSeleccionado), this.grupoId)
    .subscribe(juegoCreado => {
      console.log(juegoCreado);
      console.log('Juego creado correctamente');
    });
  }

  // CrearJuegoDeColeccion() {
  //   this.juegoService.POST_JuegoDeColeccion(new Juego (this.tipoDeJuegoSeleccionado, this.modoDeJuegoSeleccionado,
  // this.coleccionSeleccionada), this.grupoId)
  //   .subscribe(juegoCreado => {
  //     console.log(juegoCreado);
  //     console.log('Juego creado correctamente');
  //   });
  // }

  CrearJuegoCorrespondiente() {
    if (this.tipoDeJuegoSeleccionado === 'Juego De Puntos') {
      console.log('Voy a crear juego de puntos');
      this.CrearJuegoDePuntos();
    }

    if (this.tipoDeJuegoSeleccionado === 'Juego De Colección') {
      this.CrearJuegoDePuntos();
    }
  }

}
