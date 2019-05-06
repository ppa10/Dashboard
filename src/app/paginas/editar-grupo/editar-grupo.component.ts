import { Component, OnInit } from '@angular/core';

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


  grupoSeleccionado: Grupo;
  profesorId: number;

  constructor( private grupoService: GrupoService,
               private profesorService: ProfesorService) { }

  ngOnInit() {
    this.grupoSeleccionado = this.grupoService.DameGrupo();
    this.profesorId = this.profesorService.DameProfesorId();
  }

}
