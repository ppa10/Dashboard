import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

// Servicios
import { PuntosInsigniasService, ProfesorService } from '../../servicios/index';

// Clases
import { Punto, Insignia } from '../../clases/index';

@Component({
  selector: 'app-crear-punto',
  templateUrl: './crear-punto.component.html',
  styleUrls: ['./crear-punto.component.css']
})
export class CrearPuntoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', ' '];
  profesorId: number;

  // tslint:disable-next-line:ban-types
  isDisabledPuntos: Boolean = true;

  // tslint:disable-next-line:ban-types
  isDisabledInsignias: Boolean = true;

  puntosAgregados: Punto [] = [];

  insigniasAgregadas: Insignia [] = [];

  nombrePunto: string;
  descripcionPunto: string;

  nombreInsignia: string;
  descripcionInsignia: string;

  constructor( private puntosInsigniasService: PuntosInsigniasService,
               private profesorService: ProfesorService,
               private route: ActivatedRoute,
               public dialog: MatDialog,
               public snackBar: MatSnackBar) { }

  ngOnInit() {

    // REALMENTE LA APP FUNCIONARÁ COGIENDO AL PROFESOR DEL SERVICIO, NO OBSTANTE AHORA LO RECOGEMOS DE LA URL
    // this.profesorId = this.profesorService.RecibirProfesorIdDelServicio();
    this.profesorId = Number (this.route.snapshot.paramMap.get('id'));

    console.log(this.profesorId);
  }

  CrearPunto() {
    console.log('Entro a crear punto');
    console.log(this.nombrePunto);
    console.log(this.descripcionPunto);
    this.puntosInsigniasService.POST_Punto(new Punto(this.nombrePunto, this.descripcionPunto), this.profesorId)
    .subscribe(res => {
      if (res !== undefined) {
        console.log('Punto añadido correctamente');
        this.snackBar.open(this.nombrePunto + ' creado correctamente', 'Cerrar', {
          duration: 2000,
        });
        this.PuntosAgregados(res);
        this.LimpiarCampos();
      } else {
        console.log('Fallo añadiendo');
      }
    });
  }

  BorrarPunto(punto: Punto) {
    this.puntosInsigniasService.DELETE_Punto(punto.id, punto.profesorId)
    .subscribe(() => {
      this.PuntosEliminados(punto);
      console.log('punto borrado correctamente');

    });
  }

  Prueba() {
    console.log(this.puntosAgregados);

  }

  LimpiarCampos() {
    this.nombrePunto = undefined;
    this.descripcionPunto = undefined;
    this.isDisabledPuntos = true;
  }

  PuntosAgregados(punto: Punto) {
    this.puntosAgregados.push(punto);
    this.puntosAgregados = this.puntosAgregados.filter(res => res.Nombre !== '');
    return this.puntosAgregados;
  }

  PuntosEliminados(punto: Punto) {
    this.puntosAgregados = this.puntosAgregados.filter(res => res.id !== punto.id);
    return this.puntosAgregados;
  }

  disabled() { // without type info
    console.log('entro en la funcion');
    if (this.nombrePunto === undefined || this.descripcionPunto === undefined || this.nombrePunto === '' ||
      this.descripcionPunto === '') {
      this.isDisabledPuntos = true;
    } else {
      this.isDisabledPuntos = false;
    }
  }

  CrearInsignia() {
    console.log('Entro a crear punto');
    console.log(this.nombrePunto);
    console.log(this.descripcionPunto);
    this.puntosInsigniasService.POST_Punto(new Punto(this.nombrePunto, this.descripcionPunto), this.profesorId)
    .subscribe(res => {
      if (res !== undefined) {
        console.log('Punto añadido correctamente');
        this.snackBar.open(this.nombrePunto + ' creado correctamente', 'Cerrar', {
          duration: 2000,
        });
        this.PuntosAgregados(res);
        this.LimpiarCampos();
      } else {
        console.log('Fallo añadiendo');
      }
    });
  }



}
