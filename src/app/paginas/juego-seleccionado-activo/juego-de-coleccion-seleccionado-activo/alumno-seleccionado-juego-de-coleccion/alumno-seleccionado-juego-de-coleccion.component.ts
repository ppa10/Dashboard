import { Component, OnInit } from '@angular/core';
import { ResponseContentType, Http, Response } from '@angular/http';
import {Sort} from '@angular/material/sort';

import { Alumno, Equipo, Juego, AlumnoJuegoDeColeccion, EquipoJuegoDeColeccion,
  Album, AlbumEquipo, Coleccion, Cromo } from '../../../../clases/index';

// Servicios
import { AlumnoService, JuegoService, EquipoService } from '../../../../servicios/index';
import { JuegoComponent } from 'src/app/paginas/juego/juego.component';

@Component({
  selector: 'app-alumno-seleccionado-juego-de-coleccion',
  templateUrl: './alumno-seleccionado-juego-de-coleccion.component.html',
  styleUrls: ['./alumno-seleccionado-juego-de-coleccion.component.scss']
})
export class AlumnoSeleccionadoJuegoDeColeccionComponent implements OnInit {

  inscripcionAlumno: AlumnoJuegoDeColeccion;
  inscripcionEquipo: EquipoJuegoDeColeccion;

  alumno: Alumno;

  juegoSeleccionado: Juego;

  ListaCromos: Cromo[];
  cromo: Cromo;

  imagenCromoArray: string[] = [];

  // imagen
  imagenPerfil: string;

  constructor( private alumnoService: AlumnoService,
               private juegoService: JuegoService,
               private http: Http ) { }

  ngOnInit() {
    this.juegoSeleccionado = this.juegoService.RecibirJuegoDelServicio();

    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.inscripcionAlumno = this.juegoService.RecibirInscripcionAlumnoDelServicio();
      this.alumno = this.alumnoService.RecibirAlumnoDelServicio();
      this.CromosDelAlumno();
      this.GET_ImagenPerfil();
    } else {

    }

  }

  // Busca el logo que tiene el nombre del equipo.FotoEquipo y lo carga en imagenLogo
  GET_ImagenPerfil() {

    if (this.alumno.ImagenPerfil !== undefined ) {
      this.http.get('http://localhost:3000/api/imagenes/imagenAlumno/download/' + this.alumno.ImagenPerfil,
      { responseType: ResponseContentType.Blob })
      .subscribe(response => {

        const blob = new Blob([response.blob()], { type: 'image/jpg'});

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.imagenPerfil = reader.result.toString();
        }, false);

        if (blob) {
          reader.readAsDataURL(blob);
        }
      });
    }

  }


  CromosDelAlumno() {
    this.juegoService.GET_CromosAlumno(this.inscripcionAlumno.id)
    .subscribe(cromos => {
      this.ListaCromos = cromos;
      this.GET_ImagenCromo();
      console.log(this.ListaCromos);
      this.OrdenarCromos();
    });


  }

  // Ordena los cromos por nombre. Asi si tengo algun cromo repetido, salen juntos
  OrdenarCromos() {
    this.ListaCromos.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
  }

  // compare(a: number | string, b: number | string, isAsc: boolean) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }

  GET_ImagenCromo() {

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.ListaCromos.length; i++) {

      this.cromo = this.ListaCromos[i];

      if (this.cromo.Imagen !== undefined ) {

        // Busca en la base de datos la imágen con el nombre registrado en equipo.FotoEquipo y la recupera
        this.http.get('http://localhost:3000/api/imagenes/ImagenCromo/download/' + this.cromo.Imagen,
        { responseType: ResponseContentType.Blob })
        .subscribe(response => {
          const blob = new Blob([response.blob()], { type: 'image/jpg'});

          const reader = new FileReader();
          reader.addEventListener('load', () => {
            this.imagenCromoArray[i] = reader.result.toString();
          }, false);

          if (blob) {
            reader.readAsDataURL(blob);
          }

        });
      }
    }
  }

  prueba() {
    console.log(this.ListaCromos);
  }
}
