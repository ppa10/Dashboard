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



    // Inicio los parámetros de los inputs con los valores actuales
    this.nombreGrupo = this.grupoSeleccionado.Nombre;
    this.descripcionGrupo = this.grupoSeleccionado.Descripcion;

    if (this.alumnosGrupoSeleccionado !== undefined) {
      // Al principio no hay alumnos seleccionados para eliminar
      this.seleccionados = Array(this.alumnosGrupoSeleccionado.length).fill(false);
    }

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
        this.snackBar.open('Grupo editado correctamente', 'Cerrar', {
          duration: 2000,
        });
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
        console.log('entro a actualizar la tabla');
        this.alumnosGrupoSeleccionado = res;
        this.seleccionados = Array(this.alumnosGrupoSeleccionado.length).fill(false);
        console.log(res);

      } else {
        console.log('No hay alumnos en este grupo');
        this.alumnosGrupoSeleccionado = undefined;
        this.seleccionados = [];
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


  // Pone a true o false la posición del vector seleccionados que le pasamos (i) en función de su estado
  Seleccionar(i: number) {

    if (!this.selection.isSelected(this.alumnosGrupoSeleccionado[i]) === true) {
      this.seleccionados[i] = true;
    } else {
      this.seleccionados[i] = false;
    }
    console.log(this.seleccionados);
  }

  // Pone a true or false todo el vector seleccionado
  SeleccionarTodos() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.alumnosGrupoSeleccionado.length; i++) {

      if (!this.isAllSelected() === true) {
        this.seleccionados[i] = true;
      } else {
        this.seleccionados[i] = false;
      }

    }
    console.log(this.seleccionados);
  }

    // SI QUEREMOS BORRA UN GRUPO, ANTES NOS SALDRÁ UN AVISO PARA CONFIRMAR LA ACCIÓN COMO MEDIDA DE SEGURIDAD. ESTO SE HARÁ
  // MEDIANTE UN DIÁLOGO
  AbrirDialogoConfirmacionBorrar(): void {

    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      height: '150px',
      data: {
        mensaje: this.mensaje,
        nombre: this.grupoSeleccionado.Nombre,
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.BorrarAlumnos();
        this.snackBar.open('Alumnos eliminados correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    });
  }

  BorrarAlumnos() {

    for (let i = 0; i < this.seleccionados.length; i++) {

      if (this.seleccionados [i]) {
        let alumno: Alumno;
        alumno = this.alumnosGrupoSeleccionado[i];
        console.log(alumno.Nombre + ' seleccionado');

        // Recupero la matrícula del alumno en este grupo
        this.matriculaService.GET_MatriculaAlumno(alumno.id, this.grupoSeleccionado.id)
        .subscribe(matricula => {

          console.log('Doy la matricula de ' + alumno.Nombre);
          console.log(matricula[0]);

          // Una vez recupero la matrícula, la borro
          this.matriculaService.DELETE_Matricula(matricula[0].id)
          .subscribe(res => {
            console.log(alumno.Nombre + ' borrado correctamente');
            this.AlumnosDelGrupo();

          });
        });
      }
    }
    this.selection.clear();
  }

  prueba() {
    console.log(this.alumnosGrupoSeleccionado);
    console.log(this.seleccionados);
  }


  // NOS DEVOLVERÁ AL INICIO
  goBack() {
    this.location.back();
  }
}
