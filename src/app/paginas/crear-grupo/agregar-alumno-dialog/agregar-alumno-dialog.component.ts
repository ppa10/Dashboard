import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Servicios
import {ProfesorService, MatriculaService, AlumnoService} from '../../../servicios/index';

// Clases
import { Grupo, Alumno, Matricula } from '../../../clases/index';

@Component({
  selector: 'app-agregar-alumno-dialog',
  templateUrl: './agregar-alumno-dialog.component.html',
  styleUrls: ['./agregar-alumno-dialog.component.css']
})
export class AgregarAlumnoDialogComponent implements OnInit {

  // PONEMOS LAS COLUMNAS DE LA TABLA Y LA LISTA QUE TENDRÁ LA INFORMACIÓN QUE QUEREMOS MOSTRAR (alumnosEquipo) y (alumnosAsignables)
  displayedColumns: string[] = ['nombreAlumno', 'primerApellido', 'segundoApellido', 'alumnoId'];

  alumno: Alumno;
  alumnosAgregados: Alumno[] = []; // Inicializamos vacio
  grupoId: number;
  profesorId: number;

  // Declaramos el FormGroup que tendrá los tres controladores que recibirán los parámetros de entrada
  myForm: FormGroup;


  constructor(private matriculaService: MatriculaService,
              private alumnoService: AlumnoService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AgregarAlumnoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    // Recogemos los datos que le pasamos del otro componente
    this.grupoId = this.data.grupoId;
    this.profesorId = this.data.profesorId;


    this.myForm = this.formBuilder.group({
      nombreAlumno: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
    });

  }



   // MATRICULA A UN ALUMNO CONCRETO EN UN GRUPO CONCRETO MEDIANTE SUS IDENTIFICADORES
   MatricularAlumno() {

    console.log('voy a entrar a matricular al alumno con id y grupo ' + this.alumno.id + ' ' + this.grupoId);
    this.matriculaService.POST_Matricula(new Matricula (this.alumno.id, this.grupoId))
    .subscribe((resMatricula) => {
      if (resMatricula != null) {
        console.log('Matricula: ' + resMatricula);

        this.AgregarAlumnoListaAgregados(this.alumno);

        // Una vez matriculado el alumno, limpiamos el form para poder añadir un alumno nuevo
        this.myForm.reset();
      } else {
        console.log('fallo en la matriculación');
      }
    });

  }

  // PARA AGREGAR UN ALUMNO NUEVO A LA BASE DE DATOS DEBEMOS HACERLO DESDE LAS VENTANAS DE CREAR GRUPO O EDITAR GRUPO.
  // CREARÁ AL ALUMNO Y LO MATRICULARÁ EN EL GRUPO QUE ESTAMOS CREANDO/EDITANDO
  AgregarAlumnoNuevoGrupo() {

    let nombreAlumno: string;
    let primerApellido: string;
    let segundoApellido: string;

    nombreAlumno = this.myForm.value.nombreAlumno;
    primerApellido = this.myForm.value.primerApellido;
    segundoApellido = this.myForm.value.segundoApellido;

    this.alumnoService.POST_AlumnosAlProfesor(
      new Alumno (nombreAlumno, primerApellido, segundoApellido), this.profesorId)
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

  AgregarAlumnoListaAgregados(alumno: Alumno): Alumno[] {
    this.alumnosAgregados.push(alumno);

    this.alumnosAgregados = this.alumnosAgregados.filter(res => res.Nombre !== '');
    console.log('Añado alumno a Lista Agregados');
    console.log(this.alumnosAgregados);
    return this.alumnosAgregados;
  }

  // BorrarAlumnos() {

  //   for (let i = 0; i < this.seleccionados.length; i++) {

  //     if (this.seleccionados [i]) {
  //       let alumno: Alumno;
  //       alumno = this.alumnosGrupoSeleccionado[i];
  //       console.log(alumno.Nombre + ' seleccionado');

  //       // Recupero la matrícula del alumno en este grupo
  //       this.matriculaService.GET_MatriculaAlumno(alumno.id, this.grupoSeleccionado.id)
  //       .subscribe(matricula => {

  //         console.log('Doy la matricula de ' + alumno.Nombre);
  //         console.log(matricula[0]);

  //         // Una vez recupero la matrícula, la borro
  //         this.matriculaService.DELETE_Matricula(matricula[0].id)
  //         .subscribe(res => {
  //           console.log(alumno.Nombre + ' borrado correctamente');
  //           this.AlumnosDelGrupo();

  //         });
  //       });
  //     }
  //   }
  //   this.selection.clear();
  // }

  // A LA HORA DE AÑADIR UN ALUMNO AL GRUPO, PRIMERO COMPRUEBA SI ESE ALUMNO YA ESTA REGISTRADO EN LA BASE DE DATOS.
  // EN CASO DE ESTAR REGISTRADO, SOLO HACE LA MATRICULA. SINO, LO AGREGA Y HACE LA MATRICULA
  BuscarAlumnoBaseDeDatos() {
    console.log('voy a entrar a buscar alumno');

    let nombreAlumno: string;
    let primerApellido: string;
    let segundoApellido: string;

    nombreAlumno = this.myForm.value.nombreAlumno;
    primerApellido = this.myForm.value.primerApellido;
    segundoApellido = this.myForm.value.segundoApellido;

    this.alumnoService.GET_AlumnoConcreto(
      new Alumno (nombreAlumno, primerApellido, segundoApellido), this.profesorId)
      .subscribe((respuesta) => {
        if (respuesta[0] !== undefined) {
        console.log('El alumno existe. Solo voy a matricularlo en este grupo');
        this.alumno = respuesta[0];
        console.log(this.alumno);
        this.MatricularAlumno();
       } else {
        console.log('El alumno no existe. Voy a agregarlo y matricularlo');
        this.AgregarAlumnoNuevoGrupo();
        }
      });
  }


  Aceptar() {
    console.log('Alumnos añadidos. Cierro el dialogo');
  }

  prue() {
    console.log(this.grupoId);
    console.log(this.alumnosAgregados);
  }

}
