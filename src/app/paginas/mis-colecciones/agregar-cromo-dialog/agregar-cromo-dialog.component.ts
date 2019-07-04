import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Clases
import { Cromo, Coleccion } from '../../../clases/index';

// Servicios
import { ColeccionService } from '../../../servicios/index';
@Component({
  selector: 'app-agregar-cromo-dialog',
  templateUrl: './agregar-cromo-dialog.component.html',
  styleUrls: ['./agregar-cromo-dialog.component.scss']
})
export class AgregarCromoDialogComponent implements OnInit {

  coleccionId: string;

  constructor(  private coleccionService: ColeccionService,
                private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<AgregarCromoDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // Recogemos los datos que le pasamos del otro componente
    this.coleccionId = this.data.coleccionId;
  }

}
