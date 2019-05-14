import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { AgregarAlumnoDialogComponent } from '../crear-grupo/agregar-alumno-dialog/agregar-alumno-dialog.component';

// Clases
import { Grupo, Alumno } from '../../clases/index';

// Servicios
import { GrupoService, ProfesorService, AlumnoService } from '../../servicios/index';

import {MatDialog} from '@angular/material';




@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css']
})
export class EditarGrupoComponent implements OnInit {

  // PARÁMETROS QUE RECOGEMOS DEL COMPONENTE GRUPO
  grupoSeleccionado: Grupo;
  profesorId: number;
  alumnosGrupoSeleccionado: Alumno[];

  //
  alumnosSeleccionados: Alumno[];

  // PROPIEDADES GRUPO
  nombreGrupo: string;
  descripcionGrupo: string;

  SelectedIDs: any[];

    // PRUEBA
    // displayedColumns: string[] = ['nombreAlumno', 'primerApellido', 'segundoApellido', 'alumnoId'];
    // dataSource: MatTableDataSource<Alumno>;
    // selection = new SelectionModel<Alumno>(true, []);
    displayedColumns: string[] = ['select', 'nombreAlumno', 'primerApellido', 'segundoApellido', 'alumnoId'];
    dataSource: MatTableDataSource<Alumno>;
    selection = new SelectionModel<Alumno>(true, []);



  constructor( private grupoService: GrupoService,
               private profesorService: ProfesorService,
               private alumnoService: AlumnoService,
               public dialog: MatDialog,
               private location: Location) { }

  ngOnInit() {
    this.grupoSeleccionado = this.grupoService.RecibirGrupoDelServicio();
    this.profesorId = this.grupoSeleccionado.profesorId;
    this.alumnosGrupoSeleccionado = this.alumnoService.RecibirListaAlumnosDelServicio();

    this.dataSource = new MatTableDataSource<Alumno>(this.alumnosGrupoSeleccionado);

    console.log(this.dataSource);

    // Inicio los parámetros de los inputs con los valores actuales
    this.nombreGrupo = this.grupoSeleccionado.Nombre;
    this.descripcionGrupo = this.grupoSeleccionado.Descripcion;
  }

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));

  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: Alumno): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;

  // }

  // NOS PERMITE MODIFICAR EL NOMBRE Y LA DESCRIPCIÓN DEL GRUPO QUE ESTAMOS CREANDO
  EditarGrupo() {

    console.log('entro a editar');

    this.grupoService.PUT_Grupo(new Grupo(this.nombreGrupo, this.descripcionGrupo), this.profesorId, this.grupoSeleccionado.id)
    .subscribe((res) => {
      if (res != null) {
        console.log('Voy a editar el equipo con id ' + this.grupoSeleccionado.id);
        this.grupoSeleccionado = res;

        // Vuelvo a enviar el grupo al componente grupo para tener la versión acutalizada y vuelvo hacia atrás
        this.grupoService.EnviarGrupoAlServicio(this.grupoSeleccionado);
        this.goBack();
      } else {
        console.log('fallo editando');
      }
    });
  }

  // LE PASAMOS EL IDENTIFICADOR DEL GRUPO Y BUSCAMOS LOS ALUMNOS QUE TIENE
  AlumnosDelGrupo() {

    this.alumnoService.GET_AlumnosDelGrupo(this.grupoSeleccionado.id)
    .subscribe(res => {

      if (res[0] !== undefined) {
        this.alumnosGrupoSeleccionado = res;
        // Vuelvo a iniciar el datasource
        this.dataSource = new MatTableDataSource<Alumno>(this.alumnosGrupoSeleccionado);

      } else {
        console.log('No hay alumnos en este grupo');
      }
    });
  }

    // SI QUEREMOS AÑADIR ALUMNOS MANUALMENTE LO HAREMOS EN UN DIALOGO
  AbrirDialogoAgregarAlumnos(): void {
    const dialogRef = this.dialog.open(AgregarAlumnoDialogComponent, {
      width: '250px',
      // Le pasamos solo los id del grupo y profesor ya que es lo único que hace falta para vincular los alumnos
      data: {
        grupoId: this.grupoSeleccionado.id,
        profesorId: this.profesorId
      }
    });

    dialogRef.beforeClosed().subscribe(result => {

      // Antes de que se cierre actualizaré la lista de alumnos
      this.AlumnosDelGrupo();

    });
  }



  // OnChange($event) {
  //   console.log($event);
  //   // MatCheckboxChange {checked,MatCheckbox}
  // }

  // prueba(row?: Alumno) {
  //   if (this.selection.isSelected(row) === true ) {
  //     this.alumnosSeleccionados.push(row);
  //   }

  // }


  // NOS DEVOLVERÁ AL INICIO
  goBack() {
    this.location.back();
  }
}
