import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Servicios
import { ColeccionService } from '../../../../servicios/index';

// Clases
import { Coleccion, Cromo } from '../../../../clases/index';


@Component({
  selector: 'app-dialog-mostrar-cromos',
  templateUrl: './dialog-mostrar-cromos.component.html',
  styleUrls: ['./dialog-mostrar-cromos.component.scss']
})
export class DialogMostrarCromosComponent implements OnInit {

  coleccion: Coleccion;
  cromos: Cromo[];

  constructor( public dialogRef: MatDialogRef<DialogMostrarCromosComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private coleccionService: ColeccionService) { }

  ngOnInit() {
    this.coleccion = this.data.coleccion;
    this.ObtenerCromos();
  }

  ObtenerCromos() {
    // Busca los cromos dela coleccion en la base de datos
    this.coleccionService.GET_CromosColeccion(this.coleccion.id)
    .subscribe(res => {
      if (res[0] !== undefined) {
        this.cromos = res;
        console.log(res);
      } else {
        console.log('No hay cromos en esta coleccion');
        this.cromos = undefined;
      }
    });
  }

  prueba() {
    console.log(this.coleccion);
    console.log(this.cromos);
  }

}
