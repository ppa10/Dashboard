import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Servicios
import {AlumnoService, ProfesorService, MatriculaService} from '../../servicios/index';

// Clases
import { Grupo, Alumno, Matricula } from '../../clases/index';
import { isNullOrUndefined, isUndefined } from 'util';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.css']
})
export class CrearGrupoComponent implements OnInit {

  identificadorProfesor: string;

  formGroup: FormGroup;

  primerPaso: FormGroup;
  segundoPaso: FormGroup;

  grupo: Grupo;
  alumno: Alumno;

  // AL PRINCIPIO EL EQUIPO NO ESTA CREADO
  // tslint:disable-next-line:ban-types
  equipoYaCreado: Boolean = false;

    /** Returns a FormArray with the name 'formArray'. */
    get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private route: ActivatedRoute,
              private profesorService: ProfesorService,
              private matriculaService: MatriculaService,
              private alumnoService: AlumnoService,
              private location: Location,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder) { }





  ngOnInit() {

    // RECUPERAMOS EL ID DEL PROFESOR DE LA URL
    this.identificadorProfesor = this.route.snapshot.paramMap.get('id');

    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          nombreGrupo: ['', Validators.required],
          descripcionGrupo: ['', Validators.required],
        }),
        this._formBuilder.group({
          nombreAlumno: ['', Validators.required],
          primerApellido: ['', Validators.required],
          segundoApellido: ['', Validators.required],
        }),
      ])
    });

    this.primerPaso = this._formBuilder.group({
      nombreGrupo: ['', Validators.required],
      descripcionGrupo: ['', Validators.required],
    });

    this.segundoPaso = this._formBuilder.group({
      nombreAlumno: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
    });

  }

  // CREAMOS UN GRUPO DANDOLE UN NOMBRE Y UNA DESCRIPCIÓN
  CrearGrupo() {

    let nombreGrupo: string;
    let descripcionGrupo: string;

    nombreGrupo = this.formArray.value[0].nombreGrupo;
    descripcionGrupo = this.formArray.value[0].descripcionGrupo;

    console.log('entro a crear');

    this.profesorService.CrearGrupo(new Grupo(nombreGrupo, descripcionGrupo), this.identificadorProfesor)
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

    this.profesorService.EditarGrupo(new Grupo(nombreGrupo, descripcionGrupo), this.identificadorProfesor, this.grupo.id)
    .subscribe((res) => {
      if (res != null) {
        console.log('Voy a editar el equipo con id ' + this.grupo.id);
        this.grupo = res;
      } else {
        console.log('fallo editando');
      }
    });
  }

  // MATRICULA A UN ALUMNO CONCRETO EN UN GRUPO CONCRETO MEDIANTE SUS IDENTIFICADORES
  MatricularAlumno() {

    console.log('voy a entrar a matricular al alumno con id y grupo ' + this.alumno.id + ' ' + this.grupo.id);
    this.matriculaService.CrearMatricula(new Matricula (this.alumno.id, this.grupo.id))
    .subscribe((resMatricula) => {
      if (resMatricula != null) {
        console.log('Matricula: ' + resMatricula);
      } else {
        console.log('fallo en la matriculación');
      }
    });
  }

  // PARA AGREGAR UN ALUMNO NUEVO A LA BASE DE DATOS DEBEMOS HACERLO DESDE LAS VENTANAS DE CREAR GRUPO O EDITAR GRUPO.
  // CREARÁ AL ALUMNO Y LO MATRICULARÁ EN EL GRUPO QUE ESTAMOS CREANDO/EDITANDO
  AgregarAlumno() {

    let nombreAlumno: string;
    let primerApellido: string;
    let segundoApellido: string;

    nombreAlumno = this.formArray.value[1].nombreAlumno;
    primerApellido = this.formArray.value[1].primerApellido;
    segundoApellido = this.formArray.value[1].segundoApellido;

    this.profesorService.AgregarAlumnosProfesor(
      new Alumno (nombreAlumno, primerApellido, segundoApellido), this.identificadorProfesor)
      .subscribe(res => {
        if (res != null) {
          console.log('Voy a añadir a ' + res);
          this.alumno = res;
          this.MatricularAlumno();
        } else {
          console.log('fallo añadiendo');
        }
      });
  }


  // A LA HORA DE AÑADIR UN ALUMNO AL GRUPO, PRIMERO COMPRUEBA SI ESE ALUMNO YA ESTA REGISTRADO EN LA BASE DE DATOS.
  // EN CASO DE ESTAR REGISTRADO, SOLO HACE LA MATRICULA. SINO, LO AGREGA Y HACE LA MATRICULA
  BuscarAlumno() {
    console.log('voy a entrar a buscar alumno');

    let nombreAlumno: string;
    let primerApellido: string;
    let segundoApellido: string;

    nombreAlumno = this.formArray.value[1].nombreAlumno;
    primerApellido = this.formArray.value[1].primerApellido;
    segundoApellido = this.formArray.value[1].segundoApellido;

    this.profesorService.BuscadorAlumno(
      new Alumno (nombreAlumno, primerApellido, segundoApellido), this.identificadorProfesor)
      .subscribe((respuesta) => {
        if (respuesta[0] !== undefined) {
        console.log('El alumno existe. Solo voy a matricularlo en este grupo');
        this.alumno = respuesta[0];
        console.log(this.alumno);
        this.MatricularAlumno();
        } else {
        console.log('El alumno no existe. Voy a agregarlo y matricularlo');
        this.AgregarAlumno();
        }
      });
  }

  goBack() {
    this.location.back();
  }

}
