import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Clases
import { Grupo, Alumno } from '../../clases/index';

// Servicios
import { GrupoService, ProfesorService } from '../../servicios/index';

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
               private location: Location) { }

  ngOnInit() {

    // LE PIDO AL SERVICIO QUE ME DE LOS DATOS DEL PROFESOR QUE ME HAN ENVIADO
    this.grupoSeleccionado = this.grupoService.DameGrupo();
    this.profesorId = this.profesorService.DameProfesorId();
    console.log('entro en editar');

    // PEDIMOS LA LISTA DE ALUMNOS CUANDO INICIAMOS EL COMPONENTE
    this.AlumnosDelGrupo();

  }

  // LE PASAMOS EL IDENTIFICADOR DEL GRUPO Y BUSCAMOS LOS ALUMNOS QUE TIENE
  AlumnosDelGrupo() {
    console.log('Voy a listar los alumnos');
    this.grupoService.MostrarAlumnosGrupo(this.grupoSeleccionado.id)
    .subscribe(res => {
      console.log('Voy a dar la lista');
      if (res[0] !== undefined) {
        this.alumnosGrupoSeleccionado = res;
        console.log(this.alumnosGrupoSeleccionado);

      } else {
        console.log('No hay alumnos en este grupo');
      }
    });
  }

  entrarEditarGrupo(grupo) {
    console.log('Has seleccionado el grupo ' + grupo.Nombre);

    // AHORA SE LO ENVIO AL SERVICIO
    this.grupoService.TomaGrupo(grupo);
    this.profesorService.TomaProfesorId(this.profesorId);

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
