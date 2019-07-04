import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// Imports para abrir diálogo mostrar cromos
import { MatDialog, MatSnackBar, MatTabGroup } from '@angular/material';
import { DialogMostrarCromosComponent } from './dialog-mostrar-cromos/dialog-mostrar-cromos.component';

import { Coleccion, Juego, Alumno, Equipo, AlumnoJuegoDeColeccion,
 EquipoJuegoDeColeccion} from 'src/app/clases/index';
// Services
import { JuegoService, GrupoService, ColeccionService, ProfesorService, AlumnoService, EquipoService } from '../../../servicios/index';

@Component({
  selector: 'app-asignacion-coleccion-juego',
  templateUrl: './asignacion-coleccion-juego.component.html',
  styleUrls: ['./asignacion-coleccion-juego.component.scss']
})
export class AsignacionColeccionJuegoComponent implements OnInit {

  grupoId: number;
  profesorId: number;

  colecciones: Coleccion[];

  alumnos: Alumno[];
  equipos: Equipo[];

  datasourceColecciones;

  // tslint:disable-next-line:ban-types
  isDisabled: Boolean = true;

  displayedColumns: string[] = ['nombreColeccion', ' '];
  coleccionSeleccionada: Coleccion;

  juego: Juego;

  constructor( private juegoService: JuegoService,
               private profesorService: ProfesorService,
               private grupoService: GrupoService,
               private equipoService: EquipoService,
               private coleccionService: ColeccionService,
               public dialog: MatDialog) { }

  ngOnInit() {

    this.juego = this.juegoService.RecibirJuegoDelServicio();
    this.coleccionService.RecibirColeccionDelServicio();
    this.alumnos = this.grupoService.RecibirAlumnosGrupoDelServicio();
    this.EquiposDelGrupo();
    this.GET_ListaColecciones();
    console.log(this.juegoService.RecibirJuegoDelServicio());

    this.grupoId = this.juego.grupoId;
  }

  // RECUPERA LOS EQUIPOS DEL GRUPO
  EquiposDelGrupo() {
    this.equipoService.GET_EquiposDelGrupo(this.juego.grupoId)
    .subscribe(equipos => {
      if (equipos !== undefined) {
        console.log('Hay equipos');
        this.equipos = equipos;
        console.log(this.equipos);
      } else {
        console.log('Este grupo aun no tiene equipos');
      }

    });
  }

  applyFilter(filterValue: string) {
    this.datasourceColecciones.filter = filterValue.trim().toLowerCase();
  }

  GET_ListaColecciones() {
    this.profesorId = this.profesorService.RecibirProfesorIdDelServicio();
    this.ListaDeColecciones();
  }

  ListaDeColecciones() {
    this.coleccionService.GET_ColeccionesDelProfesor(this.profesorId)
    .subscribe(colecciones => {
      this.colecciones = colecciones;
      this.datasourceColecciones = new MatTableDataSource(this.colecciones);
    });
  }

  ColeccionSeleccionada(coleccion: Coleccion) {
    this.coleccionSeleccionada = coleccion;
    this.isDisabled = false;
    console.log(this.coleccionSeleccionada);
  }

  AsignarColeccionJuego() {
    this.juegoService.PUT_JuegoDeColeccion(new Juego (this.juego.Tipo, this.juego.Modo, this.coleccionSeleccionada.id),
     this.grupoId, this.juego.id).subscribe(res => {
      this.InscribirParticipantesJuego();
      console.log(res);
     });
  }

  InscribirParticipantesJuego() {

    if (this.juego.Modo === 'Individual') {
      console.log('voy a inscribir alumnos');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.alumnos.length; i++) {
        console.log(this.alumnos[i]);
        this.juegoService.POST_AlumnoJuegoDeColeccion(new AlumnoJuegoDeColeccion (this.alumnos[i].id, this.juego.id))
        .subscribe(alumnoJuego => console.log('alumnos inscritos correctamente en el juego de coleccion'));
      }
    } else {
      console.log('voy a inscribir equipos');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.equipos.length; i++) {
        console.log(this.equipos[i]);
        this.juegoService.POST_EquipoJuegoDeColeccion(new EquipoJuegoDeColeccion(this.equipos[i].id, this.juego.id))
        .subscribe(equiposJuego => console.log(equiposJuego));
      }
    }

  }

  AbrirDialogoMostrarCromos(coleccionSeleccionada: Coleccion): void {

    const dialogRef = this.dialog.open(DialogMostrarCromosComponent, {
      height: '150px',
      data: {
        coleccion: coleccionSeleccionada
      }
    });
  }

  prueba() {
    console.log(this.juego);
  }

 }
