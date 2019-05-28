import { Component, OnInit } from '@angular/core';

// Clases
import { Alumno, Equipo, Juego} from '../../clases/index';

// Services
import { JuegoService, GrupoService } from '../../servicios/index';

@Component({
  selector: 'app-juego-seleccionado-activo',
  templateUrl: './juego-seleccionado-activo.component.html',
  styleUrls: ['./juego-seleccionado-activo.component.css']
})
export class JuegoSeleccionadoActivoComponent implements OnInit {

  juegoSeleccionado: Juego;

  constructor( private juegoService: JuegoService ) { }

  ngOnInit() {
    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();

  }

}
