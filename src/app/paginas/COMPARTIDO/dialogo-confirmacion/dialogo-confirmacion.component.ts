import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.scss']
})
export class DialogoConfirmacionComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  mensaje: string = 'Estás seguro/a que quieres borrar?';
  TextoBotonBorrar = 'Aceptar';
  TextoBotonCancelar = 'Cancelar';

  constructor( public dialogRef: MatDialogRef<string>,
               @Inject(MAT_DIALOG_DATA) public mensajeConfirmacion: any) {

                if (mensajeConfirmacion) {
                  this.mensaje = mensajeConfirmacion.mensaje || this.mensaje;
                }
               }

  ngOnInit() {
  }


  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
