import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

// Servicios
import { PuntosInsigniasService, ProfesorService } from '../../servicios/index';

// Clases
import { Punto, Insignia } from '../../clases/index';


@Component({
  selector: 'app-mis-puntos',
  templateUrl: './mis-puntos.component.html',
  styleUrls: ['./mis-puntos.component.scss']
})
export class MisPuntosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', ' '];
  profesorId: number;
  listaPuntos: Punto[];

// LO USAREMOS PARA EL ROUTE AL SIGUIENTE COMPONENTE
returnUrl: string;

// IDENTIFICADOR ÚNICO DEL PROFESOR QUE LO RECUPERAREMOS DE LA URL
identificadorProfesor: number;

  constructor(
    private puntosInsigniasService: PuntosInsigniasService,
    private profesorService: ProfesorService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  this.profesorId = Number (this.route.snapshot.paramMap.get('id'));

  console.log(this.profesorId);
  }

}
