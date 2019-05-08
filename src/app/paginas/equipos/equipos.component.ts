import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Clases
import { Equipo, Alumno } from '../../clases/index';

// Servicios
import { GrupoService, EquipoService, AlumnoService } from '../../servicios/index';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  // PONEMOS LAS COLUMNAS DE LA TABLA Y LA LISTA QUE TENDRÁ LA INFORMACIÓN QUE QUEREMOS MOSTRAR
  displayedColumns: string[] = ['nombre', 'descripcion'];
  listaEquipos: Equipo[];

  grupoId: number;

  alumnosEquipo: Alumno[];


  constructor( private grupoService: GrupoService,
               private equipoService: EquipoService,
               private alumnoService: AlumnoService,
               private location: Location ) { }

  ngOnInit() {
    this.grupoId = this.grupoService.DameGrupoId();
    this.EquiposDelGrupo();
    console.log('inicio componente equipo');
  }


    // LE PASAMOS EL IDENTIFICADOR DEL PROFESOR Y NOS DEVUELVE UNA LISTA CON LOS GRUPOS QUE TIENE
  EquiposDelGrupo() {
    console.log('Voy a listar los equipos');
    this.equipoService.EquiposDelGrupo(this.grupoId)
    .subscribe(res => {
      if (res[0] !== undefined) {
        console.log('Voy a dar la lista de equipos');
        this.listaEquipos = res;
        console.log(this.listaEquipos);
      } else {
        console.log('Este grupo no tiene equipos');
      }
    });
  }

  // LE PASAMOS EL IDENTIFICADOR DEL GRUPO Y BUSCAMOS LOS ALUMNOS QUE TIENE
  AlumnosDelEquipo(equipoId: number) {
    console.log('voy a mostrar los alumnos del equipo ' + equipoId);

    this.equipoService.MostrarAlumnosEquipo(equipoId)
    .subscribe(res => {
      this.alumnosEquipo = res;
      if (res[0] !== undefined) {
        this.alumnosEquipo = res;
        console.log(res);
      } else {
        console.log('No hay alumnos en este grupo');
        this.alumnosEquipo = undefined;
      }
    });
  }

  EnviarEquipoEditar(equipo: Equipo, alumnosEquipo: Alumno[]) {
    console.log('voy a enviar');
    this.equipoService.TomaEquipo(equipo);
    this.alumnoService.TomaAlumnos(alumnosEquipo);
  }


  // NOS DEVOLVERÁ AL INICIO
  goBack() {
    this.location.back();
  }
}
