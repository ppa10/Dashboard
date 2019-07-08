import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

// Clases
import { Profesor } from '../../../clases/index';

// Servicios
import {ProfesorService} from '../../../servicios/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  @Output() public sidenavToggle = new EventEmitter();

  profesor: Profesor;
  id: number;

  URLInicio: string;

  // Rutas del navbar
  URLMisGrupos: string;
  URLCrearGrupo: string;
  URLMisPuntos: string;
  URLCrearPuntos: string;
  URLMisColecciones: string;
  URLCrearColeccion: string;
  URLConfiguracion: string;

  constructor( private profesorService: ProfesorService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('inicio componente navbar');
    this.URLInicio = this.router.url;
    this.URLMisGrupos = this.URLInicio + '/misGrupos';
    this.URLCrearGrupo = this.URLInicio + '/crearGrupo';
    this.URLMisPuntos = this.URLInicio + '/misPuntos';
    this.URLCrearPuntos = this.URLInicio + '/crearPuntos';
    this.URLMisColecciones = this.URLInicio + '/misColecciones';
    this.URLCrearColeccion = this.URLInicio + '/crearColeccion';
    this.URLConfiguracion = this.URLInicio + '/configuracionProfesor';


    this.profesor = this.profesorService.RecibirProfesorDelServicio();
    console.log(this.profesor);
  }



  // prueba() {
  //   console.log('inicio componente navbar');
  //   // this.profesor = this.profesorService.RecibirProfesorDelServicio()[0];

  //   this.router.navigateByUrl ('/inicio/1');
  //   console.log(this.route);
  //   this.pruebas = 'inicio/1/misGrupos';
  //   this.mensaje = 'Estás seguro/a de que quieres eliminar a los alumnos del grupo llamado: ';
  //   console.log(this.pruebas);
  //   console.log(this.mensaje);
  // }

}
