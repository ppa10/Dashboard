import { Component, OnInit } from '@angular/core';

// Clases
import { Alumno, Equipo, Juego, Punto, Nivel, AlumnoJuegoDePuntos, EquipoJuegoDePuntos,
  TablaAlumnoJuegoDePuntos } from '../../../clases/index';


// Services
import { JuegoService, GrupoService, AlumnoService } from '../../../servicios/index';
import { isNullOrUndefined, isUndefined } from 'util';


@Component({
  selector: 'app-juego-de-puntos-seleccionado-activo',
  templateUrl: './juego-de-puntos-seleccionado-activo.component.html',
  styleUrls: ['./juego-de-puntos-seleccionado-activo.component.scss']
})
export class JuegoDePuntosSeleccionadoActivoComponent implements OnInit {

  // Juego De Puntos seleccionado
  juegoSeleccionado: Juego;

  // Recupera la informacion del juego, los alumnos o los equipos, los puntos y los niveles del juego
  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];
  puntosDelJuego: Punto[];
  nivelesDelJuego: Nivel[];

  listaSeleccionable: Punto[] = [];


  // Recoge la inscripción de un alumno en el juego ordenada por puntos
  listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDePuntos[];

  // Muestra la posición del alumno, el nombre y los apellidos del alumno, los puntos y el nivel
  rankingJuegoDePuntos: TablaAlumnoJuegoDePuntos[] = [];

  puntoSeleccionadoId: number;

  displayedColumnsAlumnos: string[] = ['posicion', 'nombreAlumno', 'primerApellido', 'segundoApellido', 'puntos', 'nivel', ' '];

  constructor( private juegoService: JuegoService,
               private alumnoService: AlumnoService ) { }

  ngOnInit() {

    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();
    this.listaSeleccionable[0] =  new Punto('Totales');

    this.PuntosDelJuego();
    this.NivelesDelJuego();

    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.AlumnosDelJuego();
    } else {
      this.EquiposDelJuego();
    }
  }

  // Recupera los alumnos que pertenecen al juego
  AlumnosDelJuego() {
    this.juegoService.GET_AlumnosJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(alumnosJuego => {
      console.log(alumnosJuego);
      this.alumnosDelJuego = alumnosJuego;
      this.RecuperarInscripcionesAlumnoJuego();
    });
  }


  // Recupera los equipos que pertenecen al juego
  EquiposDelJuego() {
    this.juegoService.GET_EquiposJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(equiposJuego => {
      this.equiposDelJuego = equiposJuego;
    });
  }


  // Recupera los puntos que se pueden asignar en el juego
  PuntosDelJuego() {
    this.juegoService.GET_PuntosJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(puntos => {
      this.puntosDelJuego = puntos;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.puntosDelJuego.length; i ++) {
        this.listaSeleccionable.push(this.puntosDelJuego[i]);
      }
    });
  }


  // Recupera los niveles de los que dispone el juego
  NivelesDelJuego() {
    this.juegoService.GET_NivelesJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(niveles => {
      this.nivelesDelJuego = niveles;
      console.log(this.nivelesDelJuego);
    });
  }


  // Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesAlumnoJuego() {
    this.juegoService.GET_InscripcionesAlumnoJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.listaAlumnosOrdenadaPorPuntos = inscripciones;
      this.OrdenarPorPuntos();
      this.TablaClasificacionTotal();
    });

  }

  // Recoge la lista y la ordena por puntos de mayor a menor
  OrdenarPorPuntos() {

    // tslint:disable-next-line:only-arrow-functions
    this.listaAlumnosOrdenadaPorPuntos = this.listaAlumnosOrdenadaPorPuntos.sort(function(obj1, obj2) {
      return obj2.PuntosTotalesAlumno - obj1.PuntosTotalesAlumno;
    });
    return this.listaAlumnosOrdenadaPorPuntos;
  }

  // En función del modo, recorremos la lisa de Alumnos o de Equipos y vamos rellenando el rankingJuegoDePuntos
  TablaClasificacionTotal() {

    if (this.juegoSeleccionado.Modo === 'Individual') {

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listaAlumnosOrdenadaPorPuntos.length; i++) {
        let alumno: Alumno;
        let nivel: Nivel;

        alumno = this.BuscarAlumno(this.listaAlumnosOrdenadaPorPuntos[i].alumnoId);

        if (this.listaAlumnosOrdenadaPorPuntos[i].nivelId !== undefined) {
          console.log(this.listaAlumnosOrdenadaPorPuntos[i].alumnoId);
          nivel = this.BuscarNivel(this.listaAlumnosOrdenadaPorPuntos[i].nivelId);
          console.log(this.listaAlumnosOrdenadaPorPuntos[i].nivelId);
        }

        if (nivel !== undefined) {
          this.rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos (i + 1, alumno.Nombre, alumno.PrimerApellido, alumno.SegundoApellido,
            this.listaAlumnosOrdenadaPorPuntos[i].PuntosTotalesAlumno, nivel.Nombre);
        } else {
          this.rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos (i + 1, alumno.Nombre, alumno.PrimerApellido, alumno.SegundoApellido,
            this.listaAlumnosOrdenadaPorPuntos[i].PuntosTotalesAlumno);
        }
      }
    }

    this.rankingJuegoDePuntos = this.rankingJuegoDePuntos.filter(res => res.nombre !== '');

    return this.rankingJuegoDePuntos;

  }

  BuscarAlumno(alumnoId: number): Alumno {

    let alumno: Alumno;
    // tslint:disable-next-line:no-unused-expression
    alumno = this.alumnosDelJuego.filter(res => res.id === alumnoId)[0];
    return alumno;
  }

  BuscarNivel(nivelId: number): Nivel {

    let nivel: Nivel;
    console.log(this.nivelesDelJuego.filter(res => res.id === nivelId)[0]);

    nivel = this.nivelesDelJuego.filter(res => res.id === nivelId)[0];

    return nivel;
  }

  Informacion() {

  }

  AsignarPuntos() {
    // Para enviar la tabla de los puntos totales
    this.TablaClasificacionTotal();

    this.juegoService.EnviarAlumnoJuegoAlServicio(this.alumnosDelJuego);
    this.juegoService.EnviarListaOrdenadaJuegoPuntosAlServicio(this.listaAlumnosOrdenadaPorPuntos);
    this.juegoService.EnviarRankingJuegoPuntosAlServicio(this.rankingJuegoDePuntos);
    this.juegoService.EnviarPuntosAlServicio(this.puntosDelJuego);
    this.juegoService.EnviarNivelesAlServicio(this.nivelesDelJuego);
  }

  AccederAlumno(alumno: TablaAlumnoJuegoDePuntos) {

    const alumnoSeleccionado = this.alumnosDelJuego.filter(res => res.Nombre === alumno.nombre &&
      res.PrimerApellido === alumno.primerApellido && res.SegundoApellido === alumno.segundoApellido);



    this.alumnoService.EnviarAlumnoAlServicio(alumnoSeleccionado);
    // tslint:disable-next-line:max-line-length
    this.juegoService.EnviarInscripcionAlServicio(this.listaAlumnosOrdenadaPorPuntos.filter(res => res.alumnoId === alumnoSeleccionado[0].id));
    this.juegoService.EnviarPuntosAlServicio(this.puntosDelJuego);
    this.juegoService.EnviarNivelesAlServicio(this.nivelesDelJuego);
  }

  MostrarRankingSeleccionado() {

    // Si es indefinido muestro la tabla del total de puntos
    if (this.puntosDelJuego.filter(res => res.id === Number(this.puntoSeleccionadoId))[0] === undefined) {
      if (this.juegoSeleccionado.Modo === 'Individual') {
        console.log('Tabla del principio');
        this.TablaClasificacionTotal();
      } else {
        // Recuperar inscripciones de los equipo
      }
    } else {
      if (this.juegoSeleccionado.Modo === 'Individual') {
        console.log('Voy a por la clasficiacion del punto');
        this.ClasificacionPorTipoDePunto();
      } else {
        // Recuperar inscripciones de los equipo
      }
    }
  }

  ClasificacionPorTipoDePunto() {

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listaAlumnosOrdenadaPorPuntos.length; i ++) {

      let alumno: Alumno;
      let nivel: Nivel;

      alumno = this.BuscarAlumno(this.listaAlumnosOrdenadaPorPuntos[i].alumnoId);

      if (this.listaAlumnosOrdenadaPorPuntos[i].nivelId !== undefined) {
        console.log(this.listaAlumnosOrdenadaPorPuntos[i].alumnoId);
        nivel = this.BuscarNivel(this.listaAlumnosOrdenadaPorPuntos[i].nivelId);
        console.log(this.listaAlumnosOrdenadaPorPuntos[i].nivelId);
      }

      this.juegoService.GET_HistorialDeUnPunto(this.listaAlumnosOrdenadaPorPuntos[i].id, this.puntoSeleccionadoId)
      .subscribe(historial => {
        console.log('Doy historial');
        console.log(historial);
        let puntos = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < historial.length; j ++) {
          puntos = puntos + historial[j].ValorPunto;
        }
        console.log(puntos);
        console.log(alumno);

        if (nivel !== undefined) {
          this.rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos (i + 1, alumno.Nombre, alumno.PrimerApellido, alumno.SegundoApellido,
            puntos, nivel.Nombre);
        } else {
          this.rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos (i + 1, alumno.Nombre, alumno.PrimerApellido, alumno.SegundoApellido,
            puntos);
        }

        if (i === this.listaAlumnosOrdenadaPorPuntos.length - 1 ) {
          this.OrdenarTablaPorPuntos();
        }

      });
    }

  }

  OrdenarTablaPorPuntos() {
    console.log('Voy a orddenar la tabla');
    // tslint:disable-next-line:only-arrow-functions
    this.rankingJuegoDePuntos = this.rankingJuegoDePuntos.sort(function(obj1, obj2) {
      return obj2.puntos - obj1.puntos;
    });
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.rankingJuegoDePuntos.length; i++) {
      this.rankingJuegoDePuntos[i].posicion = i + 1;
    }
    this.rankingJuegoDePuntos = this.rankingJuegoDePuntos.filter(res => res.nombre !== '');
    return this.rankingJuegoDePuntos;
  }

  prueba() {
    console.log(this.alumnosDelJuego);

  }

  prueba2() {
    console.log(this.alumnosDelJuego);
  }

}
