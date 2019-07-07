import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { Alumno, Equipo, Juego, AlumnoJuegoDeColeccion, EquipoJuegoDeColeccion,
 Album, AlbumEquipo, Coleccion, Cromo } from '../../../../clases/index';

// Services
import { JuegoService, EquipoService, ColeccionService } from '../../../../servicios/index';

@Component({
  selector: 'app-asignar-cromos',
  templateUrl: './asignar-cromos.component.html',
  styleUrls: ['./asignar-cromos.component.scss']
})
export class AsignarCromosComponent implements OnInit {

  fechaAsignacionCromo: Date;
  fechaString: string;

  juegoSeleccionado: Juego;

  datasourceAlumno;
  datasourceEquipo;

  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];

  coleccion: Coleccion;
  cromosColeccion: Cromo[];

  displayedColumnsAlumno: string[] = ['select', 'nombreAlumno', 'primerApellido', 'segundoApellido'];
  selection = new SelectionModel<Alumno>(true, []);

  displayedColumnsEquipos: string[] = ['select', 'nombreEquipo', 'miembros'];
  selectionEquipos = new SelectionModel<Equipo>(true, []);

  seleccionados: boolean[];
  seleccionadosEquipos: boolean[];

  cromoSeleccionadoId: number;

  alumnosEquipo: Alumno[];

  inscripcionesAlumnos: AlumnoJuegoDeColeccion[];
  inscripcionesEquipos: EquipoJuegoDeColeccion[];




  // tslint:disable-next-line:ban-types
  isDisabled: Boolean = true;


  // Para asignar cromos random
  probabilidadCromos: number[] = [];
  indexCromo: number;
  numeroCromosRandom: number;


  constructor( private juegoService: JuegoService,
               private equipoService: EquipoService,
               private coleccionService: ColeccionService) { }

  ngOnInit() {

    this.coleccion = this.coleccionService.RecibirColeccionDelServicio();
    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();

    this.CromosColeccion();
    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.alumnosDelJuego = this.juegoService.RecibirAlumnoJuegoDelServicio();
      this.RecuperarInscripcionesAlumnoJuego();

      this.seleccionados = Array(this.alumnosDelJuego.length).fill(false);

      this.datasourceAlumno = new MatTableDataSource(this.alumnosDelJuego);
    } else {
      this.equiposDelJuego = this.juegoService.RecibirEquipoJuegoDelServicio();
      this.RecuperarInscripcionesEquiposJuego();
      this.seleccionadosEquipos = Array(this.equiposDelJuego.length).fill(false);
    }
  }

  CromosColeccion() {
    // Busca los cromos dela coleccion en la base de datos
    this.coleccionService.GET_CromosColeccion(this.coleccion.id)
    .subscribe(res => {
      if (res[0] !== undefined) {
        this.cromosColeccion = res;
        this.cromoSeleccionadoId = this.cromosColeccion[0].id;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.cromosColeccion.length; i ++) {
          if (this.cromosColeccion[i].Probabilidad === 'Muy Baja') {
            this.probabilidadCromos[i] = 3;

          } else if (this.cromosColeccion[i].Probabilidad === 'Baja') {

            this.probabilidadCromos[i] = 7;

          } else if (this.cromosColeccion[i].Probabilidad === 'Media') {

            this.probabilidadCromos[i] = 20;

          } else if (this.cromosColeccion[i].Probabilidad === 'Alta') {

            this.probabilidadCromos[i] = 30;

          } else {

            this.probabilidadCromos[i] = 40;

          }
        }

        console.log(res);
      } else {
        console.log('No hay cromos en esta coleccion');
        this.cromosColeccion = undefined;
      }
    });
  }


// Funciones para tabla
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {

    const numSelected = this.selection.selected.length;
    const numRows = this.alumnosDelJuego.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.alumnosDelJuego.forEach(row => {
          this.selection.select(row);
        });
  }

  toggleCheckbox(row) {
    this.selection.toggle(row);
    row.selected = !row.selected;
    console.log(row);
    console.log(this.selection.toggle(row));

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Alumno): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  // Pone a true o false la posición del vector seleccionados que le pasamos (i) en función de su estado
  Seleccionar(i: number) {

    if (!this.selection.isSelected(this.alumnosDelJuego[i]) === true) {
      this.seleccionados[i] = true;
    } else {
      this.seleccionados[i] = false;
    }
    console.log(this.seleccionados);
    this.Disabled();
  }

  // Pone a true or false todo el vector seleccionado
  SeleccionarTodos() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.alumnosDelJuego.length; i++) {

      if (!this.isAllSelected() === true) {
        this.seleccionados[i] = true;
        this.BotonDesactivado();
      } else {
        this.seleccionados[i] = false;
        this.isDisabled = true;
      }

    }
    console.log(this.seleccionados);
  }

  isAllSelectedEquipos() {

    const numSelected = this.selectionEquipos.selected.length;
    const numRows = this.equiposDelJuego.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selectionEquipos. */
  masterToggleEquipos() {
    this.isAllSelectedEquipos() ?
        this.selectionEquipos.clear() :
        this.equiposDelJuego.forEach(row => {
          this.selectionEquipos.select(row);
        });
  }

  toggleCheckboxEquipo(row) {
    this.selectionEquipos.toggle(row);
    row.selected = !row.selected;
    console.log(row);
    console.log(this.selectionEquipos.toggle(row));

  }

  /** The label for the checkbox on the passed row */
  checkboxLabelEquipo(row?: Equipo): string {
    if (!row) {
      return `${this.isAllSelectedEquipos() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionEquipos.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  // Pone a true o false la posición del vector seleccionados que le pasamos (i) en función de su estado
  SeleccionarEquipo(i: number) {

    if (!this.selectionEquipos.isSelected(this.equiposDelJuego[i]) === true) {
      this.seleccionadosEquipos[i] = true;
    } else {
      this.seleccionadosEquipos[i] = false;
    }

    this.Disabled();
  }

  // Pone a true or false todo el vector seleccionado
  SeleccionarTodosEquipos() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.equiposDelJuego.length; i++) {

      if (!this.isAllSelectedEquipos() === true) {
        this.seleccionadosEquipos[i] = true;
        // Como se que todos estarán seleccionados, debo ver si ya he seleccionado el punto y el valor
        this.BotonDesactivado();
      } else {
        this.seleccionadosEquipos[i] = false;
        this.isDisabled = true;
      }

    }
    console.log(this.seleccionadosEquipos);
  }

  BotonDesactivado() {

    console.log('voy a ver si hemos seleccionado algun cromo');
    if (this.cromoSeleccionadoId !== undefined) {
      console.log('hay algo, disabled');
      this.isDisabled = false;
    } else {
      console.log('no hay nada');
      this.isDisabled = true;
    }
  }

  Disabled() {
    console.log(this.cromoSeleccionadoId);
    if (this.juegoSeleccionado.Modo === 'Individual') {

      if (this.seleccionados.filter(res => res === true)[0] !== undefined) {
        console.log('Hay alguno seleccionado');
        this.BotonDesactivado();
      } else {
        console.log('No hay alguno seleccionado');
        this.isDisabled = true;
      }

    } else {

      if (this.seleccionadosEquipos.filter(res => res === true)[0] !== undefined) {
        console.log('Hay alguno seleccionado');
        this.BotonDesactivado();
      } else {
        console.log('No hay alguno seleccionado');
        this.isDisabled = true;
      }
    }
  }

  // Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesAlumnoJuego() {
    this.juegoService.GET_InscripcionesAlumnoJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.inscripcionesAlumnos = inscripciones;
      console.log(this.inscripcionesAlumnos);
    });
  }

      // Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesEquiposJuego() {

    this.juegoService.GET_InscripcionesEquipoJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.inscripcionesEquipos = inscripciones;
      console.log(this.inscripcionesEquipos);
      this.datasourceEquipo = new MatTableDataSource(this.equiposDelJuego);
      // this.OrdenarPorPuntosEquipos();
      // this.TablaClasificacionTotal();
    });
  }

  AsignarCromo() {

    if (this.juegoSeleccionado.Modo === 'Individual') {
      console.log('el juego es individual');
      this.AsignarCromoAlumnos();

    } else {
      console.log('El juego es en equipo');
      this.AsignarCromoEquipos();
    }

    this.selection.clear();
    this.selectionEquipos.clear();
    this.isDisabled = true;



  }

  AsignarCromoAlumnos() {

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.seleccionados.length; i++) {

       // Buscamos los alumnos que hemos seleccionado
       if (this.seleccionados [i]) {

        let alumno: Alumno;
        alumno = this.alumnosDelJuego[i];
        console.log(alumno.Nombre + ' seleccionado');

        let alumnoJuegoDeColeccion: AlumnoJuegoDeColeccion;
        alumnoJuegoDeColeccion = this.inscripcionesAlumnos.filter(res => res.alumnoId === alumno.id)[0];
        console.log(alumnoJuegoDeColeccion);

        this.juegoService.POST_AsignarCromoAlumno(new Album (alumnoJuegoDeColeccion.id, this.cromoSeleccionadoId))
        .subscribe(res => {
          console.log(res);
        });

       }


    }
    this.seleccionados = Array(this.alumnosDelJuego.length).fill(false);
  }

  AsignarCromoEquipos() {


    this.seleccionadosEquipos = Array(this.equiposDelJuego.length).fill(false);
  }

  prueba() {
    // const randomIndex = Math.floor(Math.random() * this.cromosColeccion.length);
    // console.log(randomIndex);
    // const randomCromo = this.cromosColeccion[randomIndex];
    // console.log(randomCromo);
    const probabilities = [40, 30, 20, 7, 3];
    // tslint:disable-next-line:prefer-const
    let hits = this.probabilidadCromos.map(x => 0);
    const numAttempts = 3;

    for (let k = 0; k < numAttempts; k++) {

        this.indexCromo = this.randomIndex(this.probabilidadCromos);
        hits[this.indexCromo]++;
        console.log(this.indexCromo);

    }

    for (let i = 0; i < this.probabilidadCromos.length; i++) {
        console.log('' + i + ': prob=' + this.cromosColeccion[i].Nombre +
          ', freq=' + (100 * hits[i] / numAttempts).toFixed(1));
  }
    console.log(hits);

  }

  randomIndex(
    probabilities: number[],
    randomGenerator: () => number = Math.random): number {

      // get the cumulative distribution function
      let acc = 0;
      const cdf = probabilities
          .map(v => acc += v) // running total [4,7,9,10]
          .map(v => v / acc); // normalize to max 1 [0.4,0.7,0.9,1]

      // pick a random number between 0 and 1
      const randomNumber = randomGenerator();

      // find the first index of cdf where it exceeds randomNumber
      // (findIndex() is in ES2015+)
      return cdf.findIndex(p => randomNumber < p);
  }
}
