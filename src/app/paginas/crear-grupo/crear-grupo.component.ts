import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Servicios
import {AlumnoService, ProfesorService, MatriculaService} from '../../servicios/index';

// Clases
import { Grupo, Alumno, Matricula } from '../../clases/index';

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

  MatricularAlumno() {

    console.log('voy a entrar a matricular al alumno con id y grupo ' + this.alumno.id + this.grupo.id);
    this.matriculaService.CrearMatricula(new Matricula (this.alumno.id, this.grupo.id))
    .subscribe((res) => {
      if (res != null) {
        console.log('Matricula: ' + res);
      } else {
        console.log('fallo en la matriculación');
      }
    });
  }



  prueba() {
    console.log(this.formArray.value[0].nombreGrupo);

  }


  goBack() {
    this.location.back();
  }

}
