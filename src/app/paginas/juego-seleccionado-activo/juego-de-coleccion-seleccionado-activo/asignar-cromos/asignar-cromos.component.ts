import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { Alumno, Equipo, Juego, AlumnoJuegoDeColeccion, EquipoJuegoDeColeccion,
 Album, AlbumEquipo, Coleccion, Cromo } from '../../../../clases/index';

// Services
import { JuegoService, EquipoService, JuegoDePuntosService, ColeccionService } from '../../../../servicios/index';

@Component({
  selector: 'app-asignar-cromos',
  templateUrl: './asignar-cromos.component.html',
  styleUrls: ['./asignar-cromos.component.scss']
})
export class AsignarCromosComponent implements OnInit {

  fechaAsignacionCromo: Date;
  fechaString: string;

  juegoSeleccionado: Juego;

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


  // tslint:disable-next-line:ban-types
  isDisabled: Boolean = true;


  constructor( private juegoService: JuegoService,
               private equipoService: EquipoService,
               private coleccionService: ColeccionService) { }

  ngOnInit() {

    this.coleccion = this.coleccionService.RecibirColeccionDelServicio();
    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();

    this.CromosColeccion();
    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.alumnosDelJuego = this.juegoService.RecibirAlumnoJuegoDelServicio();

      this.seleccionados = Array(this.alumnosDelJuego.length).fill(false);
    } else {
      this.equiposDelJuego = this.juegoService.RecibirEquipoJuegoDelServicio();
      this.seleccionadosEquipos = Array(this.equiposDelJuego.length).fill(false);
    }
  }

  CromosColeccion() {
    // Busca los cromos dela coleccion en la base de datos
    this.coleccionService.GET_CromosColeccion(this.coleccion.id)
    .subscribe(res => {
      if (res[0] !== undefined) {
        this.cromosColeccion = res;
        console.log(res);
      } else {
        console.log('No hay cromos en esta coleccion');
        this.cromosColeccion = undefined;
      }
    });
  }




}
