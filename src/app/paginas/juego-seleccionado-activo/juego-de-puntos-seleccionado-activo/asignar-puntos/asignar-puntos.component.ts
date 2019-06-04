import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { Alumno, Equipo, Juego, Punto, Nivel, AlumnoJuegoDePuntos, EquipoJuegoDePuntos,
  TablaAlumnoJuegoDePuntos, HistorialPuntosAlumno } from '../../../../clases/index';

// Services
import { JuegoService, GrupoService } from '../../../../servicios/index';

@Component({
  selector: 'app-asignar-puntos',
  templateUrl: './asignar-puntos.component.html',
  styleUrls: ['./asignar-puntos.component.scss']
})
export class AsignarPuntosComponent implements OnInit {

  juegoSeleccionado: Juego;

  // Recupera la informacion del juego, los alumnos o los equipos, los puntos y los niveles del juego
  alumnosDelJuego: Alumno[];
  equiposDelJuego: Equipo[];
  puntosDelJuego: Punto[];
  nivelesDelJuego: Nivel[];

  // Recoge la inscripción de un alumno en el juego ordenada por puntos
  listaAlumnosOrdenadaPorPuntos: AlumnoJuegoDePuntos[];

  // Muestra la posición del alumno, el nombre y los apellidos del alumno, los puntos y el nivel
  rankingJuegoDePuntos: TablaAlumnoJuegoDePuntos[] = [];

  displayedColumnsAlumno: string[] = ['select', 'posicion', 'nombreAlumno', 'primerApellido', 'segundoApellido', 'puntos', 'nivel'];
  selection = new SelectionModel<TablaAlumnoJuegoDePuntos>(true, []);

  seleccionados: boolean[];

  puntoSeleccionadoId: number;

  valorPunto: number;



  constructor( private juegoService: JuegoService) { }

  ngOnInit() {

    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();
    this.alumnosDelJuego = this.juegoService.RecibirAlumnoJuegoDelServicio();
    this.equiposDelJuego = this.juegoService.RecibirEquipoJuegoDelServicio();
    this.puntosDelJuego = this.juegoService.RecibirPuntosDelServicio();
    this.nivelesDelJuego = this.juegoService.RecibirNivelesDelServicio();
    this.listaAlumnosOrdenadaPorPuntos = this.juegoService.RecibirListaOrdenadaJuegoPuntosDelServicio();

    this.rankingJuegoDePuntos = this.juegoService.RecibirRankingJuegoPuntosDelServicio();
    this.seleccionados = Array(this.rankingJuegoDePuntos.length).fill(false);

    // Ordena la lista de niveles por si el profesor no los creó de forma ascendente
    this.OrdenarNiveles();
  }

  // Funciones para tabla
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.rankingJuegoDePuntos.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.rankingJuegoDePuntos.forEach(row => {
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
  checkboxLabel(row?: TablaAlumnoJuegoDePuntos): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  // Pone a true o false la posición del vector seleccionados que le pasamos (i) en función de su estado
  Seleccionar(i: number) {

    if (!this.selection.isSelected(this.rankingJuegoDePuntos[i]) === true) {
      this.seleccionados[i] = true;
    } else {
      this.seleccionados[i] = false;
    }
    console.log(this.seleccionados);
  }

  // Pone a true or false todo el vector seleccionado
  SeleccionarTodos() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.rankingJuegoDePuntos.length; i++) {

      if (!this.isAllSelected() === true) {
        this.seleccionados[i] = true;
      } else {
        this.seleccionados[i] = false;
      }

    }
    console.log(this.seleccionados);
  }

  AsignarPuntos() {

    for (let i = 0; i < this.seleccionados.length; i++) {

      // Buscamos los alumnos que hemos seleccionado
      if (this.seleccionados [i]) {

        let alumno: TablaAlumnoJuegoDePuntos;
        alumno = this.rankingJuegoDePuntos[i];
        console.log(alumno.nombre + ' seleccionado');

        let nivel: Nivel;
        let siguienteNivel: Nivel;
        nivel = this.BuscarNivelActual(this.listaAlumnosOrdenadaPorPuntos[i].nivelId);

        // Si el alumno ya ha alcanzado algun nivel, buscamos cual es el siguiente nivel del que ya tiene. Sino el siguiente
        // nivel será el primero
        if (this.listaAlumnosOrdenadaPorPuntos[i].nivelId !== undefined) {
          console.log('Si hay un nivel, buscamos el siguiente nivel');

          if (nivel.id !== this.nivelesDelJuego[this.nivelesDelJuego.length - 1].id) {
            siguienteNivel = this.BuscarSiguienteNivel(this.listaAlumnosOrdenadaPorPuntos[i].nivelId);
          } else {
            console.log('Ya hemos alcanzado el nivel maximo, no buscamos el siguiente nivel');
          }

        } else {
          console.log('El siguiente nivel es el primer nivel');
          siguienteNivel = this.nivelesDelJuego[0];
        }

        let nuevosPuntos: number;
        nuevosPuntos = this.listaAlumnosOrdenadaPorPuntos[i].PuntosTotalesAlumno + this.valorPunto;

        // Comprobamos si subimos de nivel o no

        if (nivel.id !== this.nivelesDelJuego[this.nivelesDelJuego.length - 1].id) {
          console.log('No estoy en el ultimo nivel, busco el siguiente nivel y miro si subo nivel o no');

          if (nuevosPuntos >= siguienteNivel.PuntosAlcanzar) {

            console.log('Voy a subir de nivel');
            nivel = siguienteNivel;
          } else {

            console.log('mantengo el nivel');
            if (this.listaAlumnosOrdenadaPorPuntos[i].nivelId !== undefined) {
              nivel = this.BuscarNivelActual(this.listaAlumnosOrdenadaPorPuntos[i].nivelId);
            }
          }
        } else {
          console.log('estoy maximo nivel, que es el siguiente');
          nivel = this.BuscarNivelActual(this.listaAlumnosOrdenadaPorPuntos[i].nivelId);
          console.log(nivel);
        }
        // tslint:disable-next-line:curly

        if (nivel !== undefined) {
          this.juegoService.PUT_PuntosJuegoDePuntos(new AlumnoJuegoDePuntos (this.listaAlumnosOrdenadaPorPuntos[i].alumnoId,
            this.listaAlumnosOrdenadaPorPuntos[i].juegoDePuntosId, nuevosPuntos, nivel.id),
            this.listaAlumnosOrdenadaPorPuntos[i].id).subscribe( res => {
              console.log(res);
              this.listaAlumnosOrdenadaPorPuntos[i].PuntosTotalesAlumno = nuevosPuntos;
              this.listaAlumnosOrdenadaPorPuntos[i].nivelId = nivel.id;

              this.rankingJuegoDePuntos[i].puntos = nuevosPuntos;
              this.rankingJuegoDePuntos[i].nivel = nivel.Nombre;
              this.POST_HistorialAlumno(this.valorPunto, this.puntoSeleccionadoId, this.listaAlumnosOrdenadaPorPuntos[i].id);
              this.OrdenarListaPorPuntos();
              this.OrdenarRankingPorPuntos();
            });
        } else {
          this.juegoService.PUT_PuntosJuegoDePuntos(new AlumnoJuegoDePuntos (this.listaAlumnosOrdenadaPorPuntos[i].alumnoId,
            this.listaAlumnosOrdenadaPorPuntos[i].juegoDePuntosId, nuevosPuntos),
            this.listaAlumnosOrdenadaPorPuntos[i].id).subscribe( res => {
              console.log(res);
              this.listaAlumnosOrdenadaPorPuntos[i].PuntosTotalesAlumno = nuevosPuntos;
              // this.listaAlumnosOrdenadaPorPuntos[i].nivelId = nivel.id;

              this.rankingJuegoDePuntos[i].puntos = nuevosPuntos;

              this.POST_HistorialAlumno(this.valorPunto, this.puntoSeleccionadoId, this.listaAlumnosOrdenadaPorPuntos[i].id);
              this.OrdenarListaPorPuntos();
              this.OrdenarRankingPorPuntos();
            });
        }
      }
    }
    this.selection.clear();
    this.seleccionados = Array(this.rankingJuegoDePuntos.length).fill(false);
  }

  POST_HistorialAlumno(valorPunto: number, puntoId: number, alumnoJuegoDePuntos: number ) {
    this.juegoService.POST_HistorialPuntosAlumno(new HistorialPuntosAlumno (valorPunto, puntoId, alumnoJuegoDePuntos))
    .subscribe(res => console.log(res));
  }

  // Recoge la lista y la ordena por puntos de mayor a menor
  OrdenarListaPorPuntos() {
    console.log('entro a ordenar lista');

    // tslint:disable-next-line:only-arrow-functions
    this.listaAlumnosOrdenadaPorPuntos = this.listaAlumnosOrdenadaPorPuntos.sort(function(obj1, obj2) {
      return obj2.PuntosTotalesAlumno - obj1.PuntosTotalesAlumno;
    });
    return this.listaAlumnosOrdenadaPorPuntos;
  }

  // Ordena el ranking por puntos
  OrdenarRankingPorPuntos() {
    console.log('entro a ordenar ranking');
    // tslint:disable-next-line:only-arrow-functions
    this.rankingJuegoDePuntos = this.rankingJuegoDePuntos.sort(function(obj1, obj2) {
      return obj2.puntos - obj1.puntos;
    });

    for (let i = 0; i < this.rankingJuegoDePuntos.length; i ++) {
      this.rankingJuegoDePuntos[i].posicion = i + 1;
    }
    this.rankingJuegoDePuntos = this.rankingJuegoDePuntos.filter(res => res.nombre !== '');
    return this.rankingJuegoDePuntos;
  }

  OrdenarNiveles() {

    // tslint:disable-next-line:only-arrow-functions
    this.nivelesDelJuego = this.nivelesDelJuego.sort(function(obj1, obj2) {
      return obj1.PuntosAlcanzar - obj2.PuntosAlcanzar;
    });
    return this.nivelesDelJuego;
  }

  BuscarSiguienteNivel(nivelId: number): Nivel {

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

    let nivel: Nivel;
    console.log(this.nivelesDelJuego.filter(res => res.id === nivelId)[0]);

    nivel = this.nivelesDelJuego.filter(res => res.id === nivelId)[0];

    return nivel;
  }

  prueba() {
    console.log(this.nivelesDelJuego[this.nivelesDelJuego.length - 1].id);
    console.log(this.listaAlumnosOrdenadaPorPuntos[0].nivelId);
  }

}
