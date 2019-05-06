import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Clases
import { Grupo } from '../../clases/index';

// Servicios
import { GrupoService, ProfesorService } from '../../servicios/index';


@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css']
})
export class EditarGrupoComponent implements OnInit {

  // PARÁMETROS QUE RECOGEMOS DEL COMPONENTE GRUPO
  grupoSeleccionado: Grupo;
  profesorId: number;

  // PROPIEDADES GRUPO
  nombreGrupo: string;
  descripcionGrupo: string;

  constructor( private grupoService: GrupoService,
               private profesorService: ProfesorService,
               private location: Location) { }

  ngOnInit() {
    this.grupoSeleccionado = this.grupoService.DameGrupo();
    this.profesorId = this.profesorService.DameProfesorId();

    // Inicio los parámetros de los inputs con los valores actuales
    this.nombreGrupo = this.grupoSeleccionado.Nombre;
    this.descripcionGrupo = this.grupoSeleccionado.Descripcion;
  }

  // NOS PERMITE MODIFICAR EL NOMBRE Y LA DESCRIPCIÓN DEL GRUPO QUE ESTAMOS CREANDO
  EditarGrupo() {

    console.log('entro a editar');

    this.grupoService.EditarGrupo(new Grupo(this.nombreGrupo, this.descripcionGrupo), this.profesorId, this.grupoSeleccionado.id)
    .subscribe((res) => {
      if (res != null) {
        console.log('Voy a editar el equipo con id ' + this.grupoSeleccionado.id);
        this.grupoSeleccionado = res;

        // Vuelvo a enviar el grupo al componente grupo para tener la versión acutalizada y vuelvo hacia atrás
        this.grupoService.TomaGrupo(this.grupoSeleccionado);
        this.goBack();
      } else {
        console.log('fallo editando');
      }
    });
  }

    // NOS DEVOLVERÁ AL INICIO
    goBack() {
      this.location.back();
    }
}
