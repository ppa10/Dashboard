import { Component, OnInit } from '@angular/core';
import { ResponseContentType, Http, Response } from '@angular/http';

import { Alumno, Equipo, Juego, Punto, Nivel, AlumnoJuegoDePuntos, EquipoJuegoDePuntos,
  TablaAlumnoJuegoDePuntos, HistorialPuntosAlumno, TablaHistorialPuntosAlumno } from '../../../../clases/index';

// Services
import { JuegoService, GrupoService, AlumnoService } from '../../../../servicios/index';

@Component({
  selector: 'app-alumno-seleccionado-juego-de-puntos',
  templateUrl: './alumno-seleccionado-juego-de-puntos.component.html',
  styleUrls: ['./alumno-seleccionado-juego-de-puntos.component.scss']
})
export class AlumnoSeleccionadoJuegoDePuntosComponent implements OnInit {

  juegoSeleccionado: Juego;
  alumnoSeleccionado: Alumno;
  alumnoJuegoDePuntos: AlumnoJuegoDePuntos;

  // Recupera la informacion del juego, los alumnos o los equipos, los puntos y los niveles del juego
  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];
  puntosDelJuego: Punto[];
  nivelesDelJuego: Nivel[];

  nivel: Nivel;
  siguienteNivel: Nivel;

  // imagen
  imagenPerfil: string;

  listaSeleccionable: Punto[] = [];

  puntoSeleccionadoId: number;

  historial: TablaHistorialPuntosAlumno[] = [];

  displayedColumnsAlumnos: string[] = ['nombre', 'descripcion', 'valorPunto', ' '];


  constructor( private juegoService: JuegoService,
               private alumnoService: AlumnoService,
               private http: Http  ) { }

  ngOnInit() {
    this.nivelesDelJuego = this.juegoService.RecibirNivelesDelServicio();
    this.alumnoSeleccionado = this.alumnoService.RecibirAlumnoDelServicio();
    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();
    this.alumnoJuegoDePuntos = this.juegoService.RecibirInscripcionDelServicio();

    this.puntosDelJuego = this.juegoService.RecibirPuntosDelServicio();

    this.Nivel();
    this.GET_ImagenPerfil();

    this.listaSeleccionable[0] =  new Punto('Totales');
    this.MostrarHistorialSeleccionado();

  }

  // Busca el logo que tiene el nombre del equipo.FotoEquipo y lo carga en imagenLogo
  GET_ImagenPerfil() {

    if (this.alumnoSeleccionado[0].ImagenPerfil !== undefined ) {
      this.http.get('http://localhost:3000/api/imagenes/imagenAlumno/download/' + this.alumnoSeleccionado[0].ImagenPerfil,
      { responseType: ResponseContentType.Blob })
      .subscribe(response => {

        const blob = new Blob([response.blob()], { type: 'image/jpg'});

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.imagenPerfil = reader.result.toString();
        }, false);

        if (blob) {
          reader.readAsDataURL(blob);
        }

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.puntosDelJuego.length; i ++) {
          this.listaSeleccionable.push(this.puntosDelJuego[i]);
        }
      });
    }

  }


  Nivel() {

    this.OrdenarNiveles();
    this.nivel = this.BuscarNivelActual(this.alumnoJuegoDePuntos[0].nivelId);


    // Si el alumno ya ha alcanzado algun nivel, buscamos cual es el siguiente nivel del que ya tiene. Sino el siguiente
    // nivel será el primero
    if (this.alumnoJuegoDePuntos[0].nivelId !== undefined) {

      // Si no estoy en el último nivel, busco el siguiente nivel
      if (this.alumnoJuegoDePuntos[0].nivelId !== this.nivelesDelJuego[this.nivelesDelJuego.length - 1].id) {
        this.siguienteNivel = this.BuscarSiguienteNivel(this.alumnoJuegoDePuntos[0].nivelId);
      } else {
        this.siguienteNivel = undefined;
      }
      this.porcentaje();
    } else {
      console.log(this.nivelesDelJuego[0]);
      this.siguienteNivel = this.nivelesDelJuego[0];
      this.porcentaje();
    }
  }

  OrdenarNiveles() {

    // tslint:disable-next-line:only-arrow-functions
    this.nivelesDelJuego = this.nivelesDelJuego.sort(function(obj1, obj2) {
      return obj1.PuntosAlcanzar - obj2.PuntosAlcanzar;
    });
    return this.nivelesDelJuego;
  }

  BuscarSiguienteNivel(nivelId: number): Nivel {

    console.log('Voy a buscar el siguiente nivel');
    // tslint:disable-next-line:no-inferrable-types
    let encontrado: boolean = false;
    let i = 0;
    while ((i < this.nivelesDelJuego.length) && (encontrado === false)) {

      if (this.nivelesDelJuego[i].id === nivelId) {
        encontrado = true;
      }
      i = i + 1;
    }

    return this.nivelesDelJuego[i];
  }

  BuscarNivelActual(nivelId: number): Nivel {

    console.log(this.nivelesDelJuego.filter(res => res.id === nivelId)[0]);

    this.nivel = this.nivelesDelJuego.filter(res => res.id === nivelId)[0];

    return this.nivel;
  }

  porcentaje(): number {

    let porcentaje: number;

    if (this.nivel !== undefined) {
      // Si no estoy en el útlimo nivel, busco el porcentaje. Sino el porcentaje es 1.
      if (this.alumnoJuegoDePuntos[0].nivelId !== this.nivelesDelJuego[this.nivelesDelJuego.length - 1].id) {
        console.log('no estoy en el ultimo nivel');
        porcentaje = (this.alumnoJuegoDePuntos[0].PuntosTotalesAlumno - 0) / (this.siguienteNivel.PuntosAlcanzar - 0);
      } else {
        porcentaje = 1;
      }

    } else {
      console.log('El sigueinte nivel es el primero');
      porcentaje = (this.alumnoJuegoDePuntos[0].PuntosTotalesAlumno - this.nivel.PuntosAlcanzar) /
      (this.siguienteNivel.PuntosAlcanzar - this.nivel.PuntosAlcanzar);
    }

    return porcentaje;
  }

  MostrarHistorialSeleccionado() {

    // Si es indefinido muestro la tabla del total de puntos
    if (this.puntosDelJuego.filter(res => res.id === Number(this.puntoSeleccionadoId))[0] === undefined) {
      if (this.juegoSeleccionado.Modo === 'Individual') {
        console.log('Tabla historial de todos los puntos');
        this.HistorialTotal();
        // this.TablaClasificacionTotal();
      } else {
        // Recuperar inscripciones de los equipo
      }
    } else {
      if (this.juegoSeleccionado.Modo === 'Individual') {
        console.log('Tabla historial de un punto concreto');
        // this.ClasificacionPorTipoDePunto();
      } else {
        // Recuperar inscripciones de los equipo
      }
    }
  }

  HistorialTotal() {
    console.log('Voy a por el historial');
    this.historial = [];
    if (this.juegoSeleccionado.Modo === 'Individual') {
      console.log('Es individual');
      this.juegoService.GET_HistorialPuntosAlumno(this.alumnoJuegoDePuntos[0].id)
      .subscribe(historial => {
        console.log(historial);

        if (historial[0] !== null) {
          for (let i = 0; i < historial.length; i++) {
            this.historial[i] = new TablaHistorialPuntosAlumno (this.BuscarPunto(historial[i].puntoId).Nombre,
            this.BuscarPunto(historial[i].puntoId).Descripcion, historial[i].ValorPunto, historial[i].alumnoJuegoDePuntosId,
             historial[i].id);
          }
        } else {
          this.historial = undefined;
        }


      });
    } else {
      console.log('Aqui van los equipos');
    }

    this.historial = this.historial.filter(res => res.nombre !== '');
    return this.historial;
  }

  BuscarPunto(puntoId: number): Punto {

    let punto: Punto;
    punto = this.puntosDelJuego.filter(res => res.id === puntoId)[0];
    return (punto);
  }

  BorrarPunto(punto: TablaHistorialPuntosAlumno) {
    console.log(punto);

    // Buscamos los nuevos puntos
    let nuevosPuntos: number;
    nuevosPuntos = (Number(this.alumnoJuegoDePuntos[0].PuntosTotalesAlumno) - Number(punto.valorPunto));
    console.log(nuevosPuntos);
    this.alumnoJuegoDePuntos[0].PuntosTotalesAlumno = nuevosPuntos;

    this.juegoService.DELETE_PuntosAlumno(punto.historialId).subscribe();



    console.log('Borro los puntos y miro que puntos totales tengo');

    // Comprobamos si subimos de nivel o no
    // tslint:disable-next-line:curly
    if (this.nivel !== undefined) {
      if (nuevosPuntos < this.nivel.PuntosAlcanzar) {
        if (this.nivel !== undefined) {
          console.log('Voy a bajar de nivel');
          this.siguienteNivel = this.nivel;
          this.nivel = this.BuscarNivelAnterior(this.nivel.id);
        }

      } else {
        console.log('mantengo el nivel');
      }
    }

    console.log('Voy a editar la base de datos y actualizar la tabla');
    if (this.nivel !== undefined) {
      this.juegoService.PUT_PuntosJuegoDePuntos( new AlumnoJuegoDePuntos(this.alumnoSeleccionado[0].id, this.juegoSeleccionado.id,
        nuevosPuntos, this.nivel.id), this.alumnoJuegoDePuntos[0].id).subscribe(res => {
          console.log(res);
          this.alumnoJuegoDePuntos[0] = res;
          this.MostrarHistorialSeleccionado();
        });
    } else {
      this.juegoService.PUT_PuntosJuegoDePuntos( new AlumnoJuegoDePuntos(this.alumnoSeleccionado[0].id, this.juegoSeleccionado.id,
        nuevosPuntos), this.alumnoJuegoDePuntos[0].id).subscribe(res => {
          console.log(res);
          this.alumnoJuegoDePuntos[0] = res;
          this.MostrarHistorialSeleccionado();
        });
    }

  }


  BuscarNivelAnterior(nivelId: number): Nivel {

    // tslint:disable-next-line:no-inferrable-types
    let encontrado: boolean = false;
    let i = 0;
    while ((i < this.nivelesDelJuego.length) && (encontrado === false)) {

      if (this.nivelesDelJuego[i].id === nivelId) {
        encontrado = true;
      }
      i = i + 1;
    }
    if (i >= 2) {
      return this.nivelesDelJuego[i - 2];
      console.log('punto plata o mas');
    } else {
      return undefined;
      console.log('punto bronce');
    }

  }


  prueba() {
    console.log(this.juegoSeleccionado.id);
    console.log(this.BuscarNivelAnterior(this.nivel.id));
  }

  prueba2() {
    console.log(this.historial);
  }
}
