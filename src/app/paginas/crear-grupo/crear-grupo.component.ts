import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AgregarAlumnoDialogComponent } from './agregar-alumno-dialog/agregar-alumno-dialog.component';

// Servicios
import {GrupoService } from '../../servicios/index';

// Clases
import { Grupo } from '../../clases/index';
import {MatDialog} from '@angular/material';



@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css']
})
export class CrearGrupoComponent implements OnInit {

  profesorId: string;

  formGroup: FormGroup;

  primerPaso: FormGroup;
  segundoPaso: FormGroup;

  grupo: Grupo;

  URLVueltaInicio: string;

  // AL PRINCIPIO EL EQUIPO NO ESTA CREADO
  // tslint:disable-next-line:ban-types
  equipoYaCreado: Boolean = false;

    /** Returns a FormArray with the name 'formArray'. */
    get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private grupoService: GrupoService,
              private location: Location,
              public dialog: MatDialog,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder) { }


  ngOnInit() {

    // RECUPERAMOS EL ID DEL PROFESOR DE LA URL
    this.profesorId = this.route.snapshot.paramMap.get('id');

    // tslint:disable-next-line:no-string-literal
    this.URLVueltaInicio = this.route.snapshot.queryParams['URLVueltaInicio'] || '/inicio';

    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          nombreGrupo: ['', Validators.required],
          descripcionGrupo: ['', Validators.required],
        }),
        this._formBuilder.group({
          controlador: ['', Validators.required],
        }),
      ])
    });

    this.primerPaso = this._formBuilder.group({
      nombreGrupo: ['', Validators.required],
      descripcionGrupo: ['', Validators.required],
    });

    this.segundoPaso = this._formBuilder.group({
      nombreAlumno: ['', Validators.required]
    });

  }

  // CREAMOS UN GRUPO DANDOLE UN NOMBRE Y UNA DESCRIPCIÓN
  CrearGrupo() {

    let nombreGrupo: string;
    let descripcionGrupo: string;

    nombreGrupo = this.formArray.value[0].nombreGrupo;
    descripcionGrupo = this.formArray.value[0].descripcionGrupo;

    console.log('entro a crear');

    this.grupoService.CrearGrupo(new Grupo(nombreGrupo, descripcionGrupo), this.profesorId)
    .subscribe((res) => {
      if (res != null) {
        console.log(res);
        this.equipoYaCreado = true; // Si tiro atrás y edito algo, se hará un PUT
        this.grupo = res;
      } else {
        console.log('fallo en la creación');
      }
    });
  }

  // NOS PERMITE MODIFICAR EL NOMBRE Y LA DESCRIPCIÓN DEL GRUPO QUE ESTAMOS CREANDO
  EditarGrupo() {

    console.log('entro a editar');
    let nombreGrupo: string;
    let descripcionGrupo: string;

    nombreGrupo = this.formArray.value[0].nombreGrupo;
    descripcionGrupo = this.formArray.value[0].descripcionGrupo;

    this.grupoService.EditarGrupo(new Grupo(nombreGrupo, descripcionGrupo), this.profesorId, this.grupo.id)
    .subscribe((res) => {
      if (res != null) {
        console.log('Voy a editar el equipo con id ' + this.grupo.id);
        this.grupo = res;
      } else {
        console.log('fallo editando');
      }
    });
  }

  // SI QUEREMOS AÑADIR ALUMNOS MANUALMENTE LO HAREMOS EN UN DIALOGO
  AbrirDialogoAgregarAlumnos(): void {
    const dialogRef = this.dialog.open(AgregarAlumnoDialogComponent, {
      width: '250px',
      // Le pasamos solo los id del grupo y profesor ya que es lo único que hace falta para vincular los alumnos
      data: {
        grupoId: this.grupo.id,
        profesorId: this.profesorId
      }
    });
  }

  VueltaInicio() {
    this.router.navigate([this.URLVueltaInicio, this.profesorId]);
    console.log(this.URLVueltaInicio);
  }

  goBack() {
    this.location.back();
  }

}
