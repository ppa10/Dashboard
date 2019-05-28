import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

// Clases
import { Alumno, Equipo, Juego, Punto} from '../../../clases/index';

// Services
import { JuegoService, GrupoService, PuntosInsigniasService, ProfesorService } from '../../../servicios/index';

@Component({
  selector: 'app-asignacion-punto-juego',
  templateUrl: './asignacion-punto-juego.component.html',
  styleUrls: ['./asignacion-punto-juego.component.css']
})
export class AsignacionPuntoJuegoComponent implements OnInit {

  grupoId: number;
  profesorId: number;

  //////////// PARA JUEGO DE PUNTOS

  puntosSeleccionables: Punto[];
  seleccionados: boolean[];

  displayedColumns: string[] = ['select', 'nombrePunto', 'descripcionPunto'];
  selection = new SelectionModel<Punto>(true, []);


  puntosSeleccionados: Punto[];


  constructor( private juegoService: JuegoService,
               private profesorService: ProfesorService,
               private grupoService: GrupoService,
               private puntosInsigniasService: PuntosInsigniasService) { }

  ngOnInit() {

    console.log('Inicio el componente');
    this.grupoId = this.grupoService.RecibirGrupoIdDelServicio();
    this.RecogerPuntos();
  }

  ////////////////////////////////////////////// PARA JUEGO DE PUNTOS ////////////////////////////////////////////////

  RecogerPuntos() {
    if (this.profesorService.RecibirProfesorIdDelServicio() !== undefined) {
      console.log('profesor id');
      this.profesorId = this.profesorService.RecibirProfesorIdDelServicio();
      this.PuntosParaAsignar();
    }
  }

  PuntosParaAsignar() {
    this.puntosInsigniasService.GET_Puntos(this.profesorId)
    .subscribe(puntos => {
      this.puntosSeleccionables = puntos;
      this.seleccionados = Array(this.puntosSeleccionables.length).fill(false);
      console.log(this.seleccionados);
    });
  }

 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.puntosSeleccionables.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.puntosSeleccionables.forEach(row => {
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
checkboxLabel(row?: Punto): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
}

// Pone a true o false la posición del vector seleccionados que le pasamos (i) en función de su estado
Seleccionar(i: number) {

  if (!this.selection.isSelected(this.puntosSeleccionables[i]) === true) {
    this.seleccionados[i] = true;
  } else {
    this.seleccionados[i] = false;
  }
  console.log(this.seleccionados);
}

// Pone a true or false todo el vector seleccionado
SeleccionarTodos() {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < this.puntosSeleccionables.length; i++) {

    if (!this.isAllSelected() === true) {
      this.seleccionados[i] = true;
    } else {
      this.seleccionados[i] = false;
    }

  }
  console.log(this.seleccionados);
}

}
