import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Servicios
import {EquipoService, MatriculaService} from '../../../../servicios/index';

// Clases
import { Alumno, AsignacionEquipo, Equipo } from '../../../../clases/index';

@Component({
  selector: 'app-agregar-alumno-equipo',
  templateUrl: './agregar-alumno-equipo.component.html',
  styleUrls: ['./agregar-alumno-equipo.component.css']
})
export class AgregarAlumnoEquipoComponent implements OnInit {

  // PONEMOS LAS COLUMNAS DE LA TABLA Y LA LISTA QUE TENDRÁ LA INFORMACIÓN QUE QUEREMOS MOSTRAR (alumnosEquipo) y (alumnosAsignables)
  displayedColumns: string[] = ['nombreAlumno', 'primerApellido', 'segundoApellido', 'alumnoId', ' '];


  // Equipo seleccionado
  equipo: Equipo;

  constructor( public dialogRef: MatDialogRef<AgregarAlumnoEquipoComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private equipoService: EquipoService) { }

  ngOnInit() {

    this.equipo = this.data.equipo;
  }

  AgregarAlumnosEquipo(alumnoId: number) {

    this.equipoService.AgregarAlumnosEquipo(new AsignacionEquipo(alumnoId, this.equipo.id), this.equipo.grupoId)
    .subscribe((res) => {
      if (res != null) {
        console.log('voy a entrar a la función');
        this.AlumnosDelEquipo(this.equipo.id);
        this.data.alumnosAsignables = this.AlumnoEscogido(alumnoId);
        console.log('asignado correctamente');

      } else {
        console.log('fallo en la asignación');
      }
    });

  }

    // LE PASAMOS EL IDENTIFICADOR DEL GRUPO Y BUSCAMOS LOS ALUMNOS QUE TIENE
    AlumnosDelEquipo(equipoId: number) {

      this.equipoService.MostrarAlumnosEquipo(equipoId)
      .subscribe(res => {
        console.log(this.data.alumnosEquipo);
        if (res[0] !== undefined) {
          this.data.alumnosEquipo = res;
          console.log(this.data.alumnosEquipo);
        } else {
          console.log('No hay alumnos en este grupo');
        }
      });
    }

    // SI UN ALUMNO SE AÑADE A UN EQUIPO, YA NO PUEDE SER ELEGIDO. TENEMOS QUE ELIMINARLO DE LA LISTA DE ALUMNOS ASIGNABLES
    // ESTA FUNCIÓN FILTRA LOS ALUMNOS QUE TIENEN UN ALUMNO ID DIFERENTE AL QUE LE PASAMOS Y NOS DEVUELVE LA LISTA SIN ESE ALUMNO
    AlumnoEscogido(alumnoId: number) {
      this.data.alumnosAsignables = this.data.alumnosAsignables.filter(alumno => alumno.id !== alumnoId);
      return this.data.alumnosAsignables;
    }

}
