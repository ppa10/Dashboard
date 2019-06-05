import { Component, OnInit } from '@angular/core';

// Clases
import { Alumno, Equipo, Juego, Punto, Nivel, AlumnoJuegoDePuntos, EquipoJuegoDePuntos,
  TablaAlumnoJuegoDePuntos, TablaEquipoJuegoDePuntos } from '../../../clases/index';


// Services
import { JuegoService, GrupoService, AlumnoService } from '../../../servicios/index';



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

  listaEquiposOrdenadaPorPuntos: EquipoJuegoDePuntos[];

  // Muestra la posición del alumno, el nombre y los apellidos del alumno, los puntos y el nivel
  rankingJuegoDePuntos: TablaAlumnoJuegoDePuntos[] = [];

  rankingEquiposJuegoDePuntos: TablaEquipoJuegoDePuntos[] = [];

  puntoSeleccionadoId: number;

  displayedColumnsAlumnos: string[] = ['posicion', 'nombreAlumno', 'primerApellido', 'segundoApellido', 'puntos', 'nivel', ' '];

  displayedColumnsEquipos: string[] = ['posicion', 'nombreEquipo', 'miembros', 'puntos', 'nivel', ' '];

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
      this.RecuperarInscripcionesEquiposJuego();
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


    // Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesEquiposJuego() {

    this.juegoService.GET_InscripcionesEquipoJuegoDePuntos(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.listaEquiposOrdenadaPorPuntos = inscripciones;
      console.log(this.listaEquiposOrdenadaPorPuntos);
      this.OrdenarPorPuntosEquipos();
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

  OrdenarPorPuntosEquipos() {

    // tslint:disable-next-line:only-arrow-functions
    this.listaEquiposOrdenadaPorPuntos = this.listaEquiposOrdenadaPorPuntos.sort(function(obj1, obj2) {
      return obj2.PuntosTotalesEquipo - obj1.PuntosTotalesEquipo;
    });
    return this.listaEquiposOrdenadaPorPuntos;
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
      this.rankingJuegoDePuntos = this.rankingJuegoDePuntos.filter(res => res.nombre !== '');

      return this.rankingJuegoDePuntos;

    } else {
          // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listaEquiposOrdenadaPorPuntos.length; i++) {
        let equipo: Equipo;
        let nivel: Nivel;

        equipo = this.BuscarEquipo(this.listaEquiposOrdenadaPorPuntos[i].equipoId);

        if (this.listaEquiposOrdenadaPorPuntos[i].nivelId !== undefined) {
          console.log(this.listaEquiposOrdenadaPorPuntos[i].equipoId);
          nivel = this.BuscarNivel(this.listaEquiposOrdenadaPorPuntos[i].nivelId);
          console.log(this.listaEquiposOrdenadaPorPuntos[i].nivelId);
        }

        if (nivel !== undefined) {
          this.rankingEquiposJuegoDePuntos[i] = new TablaEquipoJuegoDePuntos (i + 1, equipo.Nombre,
            this.listaEquiposOrdenadaPorPuntos[i].PuntosTotalesEquipo, nivel.Nombre);
        } else {
          this.rankingEquiposJuegoDePuntos[i] = new TablaEquipoJuegoDePuntos (i + 1, equipo.Nombre,
            this.listaEquiposOrdenadaPorPuntos[i].PuntosTotalesEquipo);
        }
      }
      this.rankingEquiposJuegoDePuntos = this.rankingEquiposJuegoDePuntos.filter(res => res.nombre !== '');

      return this.rankingEquiposJuegoDePuntos;

    }
  }

  BuscarAlumno(alumnoId: number): Alumno {

    let alumno: Alumno;
    // tslint:disable-next-line:no-unused-expression
    alumno = this.alumnosDelJuego.filter(res => res.id === alumnoId)[0];
    return alumno;
  }

  BuscarEquipo(equipoId: number): Equipo {

    let equipo: Equipo;
    // tslint:disable-next-line:no-unused-expression
    equipo = this.equiposDelJuego.filter(res => res.id === equipoId)[0];
    return equipo;
  }

  BuscarNivel(nivelId: number): Nivel {

    let nivel: Nivel;
    console.log(this.nivelesDelJuego.filter(res => res.id === nivelId)[0]);

    nivel = this.nivelesDelJuego.filter(res => res.id === nivelId)[0];

    return nivel;
  }

  Informacion() {
    this.juegoService.EnviarPuntosAlServicio(this.puntosDelJuego);
    this.juegoService.EnviarNivelesAlServicio(this.nivelesDelJuego);
  }

  AsignarPuntos() {
    // Para enviar la tabla de los puntos totales
    this.TablaClasificacionTotal();

    this.juegoService.EnviarPuntosAlServicio(this.puntosDelJuego);
    this.juegoService.EnviarNivelesAlServicio(this.nivelesDelJuego);



    this.juegoService.EnviarAlumnoJuegoAlServicio(this.alumnosDelJuego);
    this.juegoService.EnviarListaOrdenadaJuegoPuntosAlServicio(this.listaAlumnosOrdenadaPorPuntos);
    this.juegoService.EnviarRankingJuegoPuntosAlServicio(this.rankingJuegoDePuntos);

    this.juegoService.EnviarEquipoJuegoAlServicio(this.equiposDelJuego);
    this.juegoService.EnviarListaEquiposOrdenadaJuegoPuntosAlServicio(this.listaEquiposOrdenadaPorPuntos);
    this.juegoService.EnviarRankingEquipoJuegoPuntosAlServicio(this.rankingEquiposJuegoDePuntos);


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

  AccederEquipo(equipo: TablaEquipoJuegoDePuntos) {

    const equipoSeleccionado = this.equiposDelJuego.filter(res => res.Nombre === equipo.nombre);


    // this.alumnoService.EnviarAlumnoAlServicio(alumnoSeleccionado);
    // // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    // this.juegoService.EnviarInscripcionAlServicio(this.listaAlumnosOrdenadaPorPuntos.filter(res => res.alumnoId === alumnoSeleccionado[0].id));
    // this.juegoService.EnviarPuntosAlServicio(this.puntosDelJuego);
    // this.juegoService.EnviarNivelesAlServicio(this.nivelesDelJuego);
  }

  MostrarRankingSeleccionado() {

    // Si es indefinido muestro la tabla del total de puntos
    if (this.puntosDelJuego.filter(res => res.id === Number(this.puntoSeleccionadoId))[0] === undefined) {

      console.log('Tabla del principio');
      this.TablaClasificacionTotal();

    } else {
      console.log('Voy a por la clasficiacion del punto');
      this.ClasificacionPorTipoDePunto();

    }
  }

  ClasificacionPorTipoDePunto() {

    if (this.juegoSeleccionado.Modo === 'Individual') {

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
            // tslint:disable-next-line:max-line-length
            this.rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos (i + 1, alumno.Nombre, alumno.PrimerApellido, alumno.SegundoApellido,
              puntos, nivel.Nombre);
          } else {
            // tslint:disable-next-line:max-line-length
            this.rankingJuegoDePuntos[i] = new TablaAlumnoJuegoDePuntos (i + 1, alumno.Nombre, alumno.PrimerApellido, alumno.SegundoApellido,
              puntos);
          }

          if (i === this.listaAlumnosOrdenadaPorPuntos.length - 1 ) {
            this.OrdenarTablaPorPuntos();
          }
        });
      }
    } else {

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listaEquiposOrdenadaPorPuntos.length; i ++) {

        let equipo: Equipo;
        let nivel: Nivel;

        equipo = this.BuscarEquipo(this.listaEquiposOrdenadaPorPuntos[i].equipoId);

        if (this.listaEquiposOrdenadaPorPuntos[i].nivelId !== undefined) {
          console.log(this.listaEquiposOrdenadaPorPuntos[i].equipoId);
          nivel = this.BuscarNivel(this.listaEquiposOrdenadaPorPuntos[i].nivelId);
          console.log(this.listaEquiposOrdenadaPorPuntos[i].nivelId);
        }

        this.juegoService.GET_HistorialDeUnPuntoEquipo(this.listaEquiposOrdenadaPorPuntos[i].id, this.puntoSeleccionadoId)
        .subscribe(historial => {
          console.log('Doy historial equipos');
          console.log(historial);
          let puntos = 0;
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < historial.length; j ++) {
            puntos = puntos + historial[j].ValorPunto;
          }
          console.log(puntos);
          console.log(equipo);

          if (nivel !== undefined) {
            this.rankingEquiposJuegoDePuntos[i] = new TablaEquipoJuegoDePuntos (i + 1, equipo.Nombre,
              puntos, nivel.Nombre);
          } else {
            this.rankingEquiposJuegoDePuntos[i] = new TablaEquipoJuegoDePuntos (i + 1, equipo.Nombre,
              puntos);
          }

          if (i === this.listaEquiposOrdenadaPorPuntos.length - 1 ) {
            this.OrdenarTablaPorPuntos();
          }
        });
      }
    }


  }

  OrdenarTablaPorPuntos() {
    if (this.juegoSeleccionado.Modo === 'Individual') {
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

    } else {

      console.log('Voy a orddenar la tabla de equipos');
      // tslint:disable-next-line:only-arrow-functions
      this.rankingEquiposJuegoDePuntos = this.rankingEquiposJuegoDePuntos.sort(function(obj1, obj2) {
        return obj2.puntos - obj1.puntos;
      });
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.rankingEquiposJuegoDePuntos.length; i++) {
        this.rankingEquiposJuegoDePuntos[i].posicion = i + 1;
      }
      this.rankingEquiposJuegoDePuntos = this.rankingEquiposJuegoDePuntos.filter(res => res.nombre !== '');
      return this.rankingEquiposJuegoDePuntos;
    }

  }

  prueba() {
    console.log(this.alumnosDelJuego);

  }

  prueba2() {
    console.log(this.alumnosDelJuego);
  }

}
