import { Component, OnInit } from '@angular/core';

// Servicios
import { JuegoService, ProfesorService } from '../../../servicios/index';

// Clases
import { Nivel, Insignia, Juego } from '../../../clases/index';

@Component({
  selector: 'app-crear-nivel',
  templateUrl: './crear-nivel.component.html',
  styleUrls: ['./crear-nivel.component.css']
})
export class CrearNivelComponent implements OnInit {


  displayedColumns: string[] = ['nombre', 'descripcion', ' '];

  juego: Juego;

  // tslint:disable-next-line:ban-types
  isDisabledNivel: Boolean = true;

  nivelAgregados: Insignia [] = [];

  nombreNivel: string;
  puntosAlcanzar: number;
  privilegiosDelNivel: string;
  nombreLogo: string;
  juegoDePuntosId: number;


  file: File;
  logo: string;

  // tslint:disable-next-line:ban-types
  logoCargado: Boolean = false;



  constructor( private juegoService: JuegoService ) { }

  ngOnInit() {

    this.juego = this.juegoService.RecibirJuegoDelServicio();
    this.juegoDePuntosId = this.juego.id;
    console.log(this.juegoDePuntosId);


  }

  Disabled() {

    if (this.nombreNivel === undefined || this.privilegiosDelNivel === undefined || this.puntosAlcanzar === undefined ||
      this.nombreNivel === '' || this.privilegiosDelNivel === '' || this.puntosAlcanzar === Number('')) {
      this.isDisabledNivel = true;
    } else {
      this.isDisabledNivel = false;
    }
  }

  LimpiarCampos() {
    this.nombreNivel = undefined;
    this.privilegiosDelNivel = undefined;
    this.puntosAlcanzar = undefined;
    this.isDisabledNivel = true;
    this.logoCargado = false;
    this.logo = undefined;
    this.nombreLogo = undefined;
  }

  prueba() {
    console.log(this.puntosAlcanzar);
  }

}
