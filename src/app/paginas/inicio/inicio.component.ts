import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

// Clases
import { Profesor } from '../../clases/index';

// Servicios
import {ProfesorService} from '../../servicios/index';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  profesor: any;


  constructor(private servicioProfesor: ProfesorService,
              private location: Location) { }

  ngOnInit() {
    this.servicioProfesor.profesorActual
    .subscribe( (res) => this.profesor = res[0]);
  }

  Prueba() {
    console.log(this.profesor);
  }

  goBack() {
    this.location.back();
  }

}
