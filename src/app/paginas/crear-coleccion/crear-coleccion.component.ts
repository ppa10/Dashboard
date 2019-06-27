import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseContentType, Http, Response } from '@angular/http';

// Imports para abrir diálogo confirmar eliminar equipo
import { MatDialog, MatSnackBar, MatTabGroup } from '@angular/material';
import { DialogoConfirmacionComponent } from '../COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';

// Servicios
import { ColeccionService, ProfesorService } from '../../servicios/index';

// Clases
import { Coleccion, Cromo } from '../../clases/index';

@Component({
  selector: 'app-crear-coleccion',
  templateUrl: './crear-coleccion.component.html',
  styleUrls: ['./crear-coleccion.component.scss']
})
export class CrearColeccionComponent implements OnInit {

  // Para el paso finalizar limpiar las variables y volver al mat-tab de "Lista de equipos"
  @ViewChild('stepper') stepper;
  @ViewChild('tabs') tabGroup: MatTabGroup;
  myForm: FormGroup;
  myForm2: FormGroup;


  // CREAR COLECCION
  imagen: string;
  coleccionCreada: Coleccion;

  // CREAR CROMO
  nombreCromo: string;
  probabilidadCromo: string;
  nivelCromo: string;

  // tslint:disable-next-line:ban-types
  isDisabledCromo: Boolean = true;

  // COMPARTIDO
  profesorId: number;
  nombreImagen: string;
  file: File;

  // Al principio coleccion no creada y imagen no cargada
  // tslint:disable-next-line:ban-types
  coleccionYaCreada: Boolean = false;
  // tslint:disable-next-line:ban-types
  imagenCargado: Boolean = false;

  cromosAgregados: Cromo [] = [];

  nombreColeccion: string;

  // PONEMOS LAS COLUMNAS DE LA TABLA Y LA LISTA QUE TENDRÁ LA INFORMACIÓN QUE QUEREMOS MOSTRAR
  displayedColumns: string[] = ['nombreCromo', 'probabilidadCromo', 'nivelCromo', ' '];


  constructor(
    private coleccionService: ColeccionService,
    private profesorService: ProfesorService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private location: Location,
    private formBuilder: FormBuilder,
    private http: Http) { }

  ngOnInit() {

    this.profesorId = Number (this.route.snapshot.paramMap.get('id'));
    // Constructor myForm
    this.myForm = this.formBuilder.group({
     nombreColeccion: ['', Validators.required]
    });
    this.myForm2 = this.formBuilder.group({
      nombreCromo : ['', Validators.required],
      probabilidadCromo : ['', Validators.required],
      nivelCromo : ['', Validators.required]
     });
  }

  CrearColeccion() {

    let nombreColeccion: string;

    nombreColeccion = this.myForm.value.nombreColeccion;

    console.log('Entro a crear la coleccion ' + nombreColeccion);
    console.log(this.nombreImagen);

    // Hace el POST del equipo
    this.coleccionService.POST_Coleccion(new Coleccion(nombreColeccion, this.nombreImagen), this.profesorId)
    .subscribe((res) => {
      if (res != null) {
        console.log(res);
        this.coleccionYaCreada = true; // Si tiro atrás y cambio algo se hará un PUT y no otro POST
        this.coleccionCreada = res; // Lo metemos en coleccionCreada, y no en coleccion!!

        // Hago el POST de la imagen SOLO si hay algo cargado. Ese boolean se cambiará en la función ExaminarImagen
        if (this.imagenCargado === true) {

          // Hacemos el POST de la nueva imagen en la base de datos recogida de la función ExaminarImagen
          const formData: FormData = new FormData();
          formData.append(this.nombreImagen, this.file);
          this.coleccionService.POST_ImagenColeccion(formData)
          .subscribe(() => console.log('Imagen cargado'));
        }

      } else {
        console.log('Fallo en la creación');
      }
    });
  }

  AgregarCromoColeccion() {

    // let nombreCromo: string;
    // let probabilidadCromo: string;
    // let nivelCromo: string;

    // nombreCromo = this.myForm2.value.nombreCromo;
    // probabilidadCromo = this.myForm2.value.probabilidadCromo;
    // nivelCromo = this.myForm2.value.nivelCromo;

    console.log('Entro a asignar el cromo ' + this.nombreCromo);
    console.log('Entro a asignar el cromo a la coleccionID' + this.coleccionCreada.id);

    this.coleccionService.POST_CromoColeccion(
      new Cromo(this.nombreCromo, 'sinImagen', this.probabilidadCromo, this.nivelCromo), this.coleccionCreada.id)
    .subscribe((res) => {
      if (res != null) {
        console.log('asignado correctamente');
        this.CromosAgregados(res);
      } else {
        console.log('fallo en la asignación');
      }
    });

  }

  CromosAgregados(cromo: Cromo) {
    this.cromosAgregados.push(cromo);
    this.cromosAgregados = this.cromosAgregados.filter(res => res.Nombre !== '');
    return this.cromosAgregados;
  }

  // Utilizamos esta función para eliminar un cromo de la base de datos y de la lista de añadidos recientemente
  BorrarCromo(cromo: Cromo) {
    console.log('Id cromo ' + this.coleccionCreada.id);
    this.coleccionService.DELETE_Cromo(cromo.id, this.coleccionCreada.id)
    .subscribe(() => {
      this.CromosEliminados(cromo);
      console.log('Cromo borrado correctamente');

    });
  }

  CromosEliminados(cromo: Cromo) {
    this.cromosAgregados = this.cromosAgregados.filter(res => res.id !== cromo.id);
    return this.cromosAgregados;
  }
    // Activa la función ExaminarImagen
    ActivarInput() {
      console.log('Activar input');
      document.getElementById('input').click();
    }


    // Buscaremos la imagen en nuestro ordenador y después se mostrará en el form con la variable "imagen" y guarda el
    // nombre de la foto en la variable nombreImagen
    ExaminarImagen($event) {
      this.file = $event.target.files[0];

      console.log('fichero ' + this.file.name);
      this.nombreImagen = this.file.name;

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        console.log('ya');
        this.imagenCargado = true;
        this.imagen = reader.result.toString();
      };
    }

    // Si estamos creando el equipo y pasamos al siguiente paso, pero volvemos hacia atrás para modificar el nombre y/o el
  // imagen, entonces no deberemos hacer un POST al darle a siguiente, sino un PUT. Por eso se hace esta función, que funciona
  // de igual manera que la de Crear Equipo pero haciendo un PUT.
  EditarColeccion() {

    console.log('Entro a editar');
    let nombreColeccion: string;

    nombreColeccion = this.myForm.value.nombreColeccion;

    this.coleccionService.PUT_Coleccion(new Coleccion(nombreColeccion, this.nombreImagen), this.profesorId, this.coleccionCreada.id)
    .subscribe((res) => {
      if (res != null) {
        console.log('Voy a editar la coleccion con id ' + this.coleccionCreada.id);
        this.coleccionCreada = res;

        // Hago el POST de la imagen SOLO si hay algo cargado
        if (this.imagenCargado === true) {
          // HACEMOS EL POST DE LA NUEVA IMAGEN EN LA BASE DE DATOS
          const formData: FormData = new FormData();
          formData.append(this.nombreImagen, this.file);
          this.coleccionService.POST_ImagenColeccion(formData)
          .subscribe(() => console.log('Imagen cargada'));
        }

      } else {
        console.log('fallo editando');
      }
    });
  }

  LimpiarCampos() {
    this.nombreCromo = undefined;
    this.probabilidadCromo = undefined;
    this.nivelCromo = null;
    this.isDisabledCromo = true;
    // this.logoCargado = false;
    // this.logo = undefined;
    // this.nombreLogo = undefined;
  }
  Disabled() {

    if (this.nombreCromo === undefined || this.probabilidadCromo === undefined || this.nivelCromo === undefined ||
      this.nivelCromo === '' || this.probabilidadCromo === '' || this.nivelCromo === null) {
      this.isDisabledCromo = true;
    } else {
      this.isDisabledCromo = false;
    }
  }
  // Función que se activará al clicar en finalizar el último paso del stepper
  Finalizar() {
    // Al darle al botón de finalizar limpiamos el formulario y reseteamos el stepper
    this.myForm.reset();
    this.myForm2.reset();
    this.stepper.reset();

    // Tambien limpiamos las variables utilizadas para crear el nuevo equipo, por si queremos crear otro.
    this.coleccionYaCreada = false;
    this.imagenCargado = false;
    this.imagen = undefined;
    this.coleccionCreada = undefined;
    this.cromosAgregados = [];

    }
}
