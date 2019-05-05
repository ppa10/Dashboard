import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';

// Servicios
import { ProfesorService, GrupoService } from '../../servicios/index';

// Clases
import { Grupo } from '../../clases/index';


@Component({
  selector: 'app-mis-grupos',
  templateUrl: './mis-grupos.component.html',
  styleUrls: ['./mis-grupos.component.css']

})

export class MisGruposComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'descripcion'];
  dataSource: Grupo [];

  // dataSource: Grupo[];
  returnUrl: string;

  identificadorProfesor: string;
  listaGrupos: Grupo[];



  // displayedColumns: string[] = ['nombre', 'descripcion'];
  // dataSource = this.listaGrupos;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private profesorService: ProfesorService,
              private grupoService: GrupoService) { }

  ngOnInit() {

    // tslint:disable-next-line:no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/grupo';

    // RECUPERAMOS EL ID DEL PROFESOR DE LA URL
    this.identificadorProfesor = this.route.snapshot.paramMap.get('id');
    this.GruposDelProfesor();

  }

  GruposDelProfesor() {
    console.log('Voy a listar los grupos');
    this.profesorService.GruposDelProfesor(this.identificadorProfesor)
    .subscribe(res => {
      console.log('Voy a dar la lista');
      this.listaGrupos = res;
      this.dataSource = this.listaGrupos;
      console.log(this.listaGrupos);
    });
  }


  cellClicked(grupo) {
    console.log(grupo.id + ' cell clicked');
  }

  prueba() {
   console.log(this.dataSource);
  }

  // selectRow(row) {
  //   console.log(row);
  // }


  goBack() {
    this.location.back();
  }

  entrarGrupo(grupo: Grupo) {
    this.router.navigate([this.returnUrl, grupo.id]);
  }

}
