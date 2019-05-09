import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Clases
import { Grupo, Alumno } from '../../clases/index';

// Servicios
import { GrupoService, ProfesorService, AlumnoService } from '../../servicios/index';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  // PONEMOS LAS COLUMNAS DE LA TABLA Y LA LISTA QUE TENDRÁ LA INFORMACIÓN QUE QUEREMOS MOSTRAR
  displayedColumns: string[] = ['nombreAlumno', 'primerApellido', 'segundoApellido', 'alumnoId'];

  grupoSeleccionado: Grupo;
  profesorId: number;
  alumnosGrupoSeleccionado: Alumno[];

  constructor( private grupoService: GrupoService,
               private profesorService: ProfesorService,
               private alumnoService: AlumnoService,
               private location: Location) { }

  ngOnInit() {

    // LE PIDO AL SERVICIO QUE ME DE LOS DATOS DEL PROFESOR QUE ME HAN ENVIADO
    this.grupoSeleccionado = this.grupoService.DameGrupo();
    this.profesorId = this.grupoSeleccionado.profesorId;

    // PEDIMOS LA LISTA DE ALUMNOS CUANDO INICIAMOS EL COMPONENTE
    this.AlumnosDelGrupo();

  }

  // LE PASAMOS EL IDENTIFICADOR DEL GRUPO Y BUSCAMOS LOS ALUMNOS QUE TIENE
  AlumnosDelGrupo() {

    this.grupoService.MostrarAlumnosGrupo(this.grupoSeleccionado.id)
    .subscribe(res => {

      if (res[0] !== undefined) {
        this.alumnosGrupoSeleccionado = res;
      } else {
        console.log('No hay alumnos en este grupo');
      }
    });
  }

  EntrarEditarGrupo() {

    // ENVIO AL SERVICIO LOS PARÁMETROS QUE NECESITO
    this.grupoService.TomaGrupo(this.grupoSeleccionado);
    this.alumnoService.TomaAlumnos(this.alumnosGrupoSeleccionado);

  }

  EntrarEquipos() {
    // ENVIAMOS EL IDENTIFICADOR Y LOS ALUMNOS DEL GRUPO SELECCIONADO
    this.grupoService.TomaGrupoId(this.grupoSeleccionado.id);
    this.grupoService.TomaAlumnosGrupo(this.alumnosGrupoSeleccionado);
  }

  // ESTA FUNCIÓN BORRARÁ EL GRUPO DE ID QUE PASEMOS DEL PROFESOR CON ID QUE PASEMOS Y VOLVERÁ A LA PÁGINA DE LISTAR
  // ACTUALIZANDO LA TABLA
  EliminarGrupo() {
    console.log('Voy a eliminar el grupo');
    this.grupoService.EliminarGrupo(this.profesorId, this.grupoSeleccionado.id)
    .subscribe(res => {
      console.log('Borrado correctamente');
      this.goBack();
    });
  }
  // NOS DEVOLVERÁ AL INICIO
  goBack() {
    this.location.back();
  }
}
