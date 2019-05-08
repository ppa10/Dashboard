import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Clases
import { Equipo, Alumno } from '../../../clases/index';

// Servicios
import { EquipoService, AlumnoService } from '../../../servicios/index';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.css']
})
export class EditarEquipoComponent implements OnInit {

  equipo: Equipo;
  alumnosEquipo: Alumno[];

  constructor( private equipoService: EquipoService,
               private alumnoService: AlumnoService,
               private location: Location ) { }

  ngOnInit() {
    this.equipo = this.equipoService.DameEquipo();
    this.alumnosEquipo = this.alumnoService.DameAlumnos();

    console.log(this.equipo);
    console.log(this.alumnosEquipo);
  }

  // NOS DEVOLVERÁ AL INICIO
  goBack() {
    this.location.back();
  }
}
