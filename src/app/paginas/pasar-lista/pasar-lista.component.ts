import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { AgregarAlumnoDialogComponent } from '../crear-grupo/agregar-alumno-dialog/agregar-alumno-dialog.component';

// Clases
import { Grupo, Alumno } from '../../clases/index';

// Servicios
import { GrupoService, MatriculaService, AlumnoService } from '../../servicios/index';


// Imports para abrir diálogo agregar alumno/confirmar eliminar grupo
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogoConfirmacionComponent } from '../COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';


@Component({
  selector: 'app-pasar-lista',
  templateUrl: './pasar-lista.component.html',
  styleUrls: ['./pasar-lista.component.scss']
})
export class PasarListaComponent implements OnInit {
  // PARÁMETROS QUE RECOGEMOS DEL COMPONENTE GRUPO
  grupoSeleccionado: Grupo;
  profesorId: number;
  alumnosGrupoSeleccionado: Alumno[];

  //
  alumnosSeleccionados: Alumno[];


  dataSource;

  displayedColumns: string[] = ['select', 'nombreAlumno', 'primerApellido', 'segundoApellido', 'alumnoId'];
  selection = new SelectionModel<Alumno>(true, []);

  seleccionados: boolean[];

  // tslint:disable-next-line:no-inferrable-types
  mensaje: string = 'Estás seguro/a de que quieres eliminar a los alumnos del grupo llamado: ';


  constructor( private grupoService: GrupoService,
               private matriculaService: MatriculaService,
               private alumnoService: AlumnoService,
               public dialog: MatDialog,
               public snackBar: MatSnackBar,
               private location: Location) { }

  ngOnInit() {
    this.grupoSeleccionado = this.grupoService.RecibirGrupoDelServicio();
    this.profesorId = this.grupoSeleccionado.profesorId;
    this.alumnosGrupoSeleccionado = this.alumnoService.RecibirListaAlumnosDelServicio();

  }
  // Para elegir fecha
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  // Filtro para alumnos
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.alumnosGrupoSeleccionado.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.alumnosGrupoSeleccionado.forEach(row => {
            this.selection.select(row);
          });
    }

    toggleCheckbox(row) {
      this.selection.toggle(row);
      row.selected = !row.selected;
      console.log(row);
      console.log(this.selection.toggle(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Alumno): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    }
}
