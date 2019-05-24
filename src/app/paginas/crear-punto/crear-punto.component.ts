import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

// Servicios
import { PuntosService } from '../../servicios/index';

// Clases
import { Punto } from '../../clases/index';

@Component({
  selector: 'app-crear-punto',
  templateUrl: './crear-punto.component.html',
  styleUrls: ['./crear-punto.component.css']
})
export class CrearPuntoComponent implements OnInit {

  constructor( private puntosService: PuntosService) { }

  ngOnInit() {
  }

}
