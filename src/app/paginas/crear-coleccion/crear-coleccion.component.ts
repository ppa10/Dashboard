import { Component, OnInit, ViewChild } from '@angular/core';
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


  // CREAR EQUIPO
  logo: string;
  coleccionCreada: Coleccion;

  // COMPARTIDO
  profesorId: number;
  nombreLogo: string;
  file: File;

  // Al principio coleccion no creada y logo no cargado
  // tslint:disable-next-line:ban-types
  coleccionYaCreada: Boolean = false;
  // tslint:disable-next-line:ban-types
  logoCargado: Boolean = false;


  constructor(
    private coleccionService: ColeccionService,
    private profesorService: ProfesorService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.profesorId = Number (this.route.snapshot.paramMap.get('id'));

  }

  CrearColeccion() {

    let nombreColeccion: string;

    nombreColeccion = this.myForm.value.nombreColeccion;

    console.log('Entro a crear el equipo ' + nombreColeccion);

    // Hace el POST del equipo
    this.coleccionService.POST_Coleccion(new Coleccion(nombreColeccion, this.nombreLogo), this.profesorId)
    .subscribe((res) => {
      if (res != null) {
        console.log(res);
        this.coleccionYaCreada = true; // Si tiro atrás y cambio algo se hará un PUT y no otro POST
        this.coleccionCreada = res; // Lo metemos en coleccionCreada, y no en coleccion!!

        // Hago el POST de la imagen SOLO si hay algo cargado. Ese boolean se cambiará en la función ExaminarLogo
        if (this.logoCargado === true) {

          // Hacemos el POST de la nueva imagen en la base de datos recogida de la función ExaminarLogo
          const formData: FormData = new FormData();
          formData.append(this.nombreLogo, this.file);
          this.coleccionService.POST_LogoColecciones(formData)
          .subscribe(() => console.log('Logo cargado'));
        }

      } else {
        console.log('Fallo en la creación');
      }
    });
  }

    // Activa la función ExaminarLogo
    ActivarInput() {
      console.log('Activar input');
      document.getElementById('input').click();
    }


    // Buscaremos la imagen en nuestro ordenador y después se mostrará en el form con la variable "logo" y guarda el
    // nombre de la foto en la variable nombreLogo
    ExaminarLogo($event) {
      this.file = $event.target.files[0];

      console.log('fichero ' + this.file.name);
      this.nombreLogo = this.file.name;

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        console.log('ya');
        this.logoCargado = true;
        this.logo = reader.result.toString();
      };
    }

    // Si estamos creando el equipo y pasamos al siguiente paso, pero volvemos hacia atrás para modificar el nombre y/o el
  // logo, entonces no deberemos hacer un POST al darle a siguiente, sino un PUT. Por eso se hace esta función, que funciona
  // de igual manera que la de Crear Equipo pero haciendo un PUT.
  EditarEquipo() {

    console.log('Entro a editar');
    let nombreColeccion: string;

    nombreColeccion = this.myForm.value.nombreColeccion;

    this.coleccionService.PUT_Coleccion(new Coleccion(nombreColeccion, this.nombreLogo), this.profesorId, this.coleccionCreada.id)
    .subscribe((res) => {
      if (res != null) {
        console.log('Voy a editar la coleccion con id ' + this.coleccionCreada.id);
        this.coleccionCreada = res;

        // Hago el POST de la imagen SOLO si hay algo cargado
        if (this.logoCargado === true) {
          // HACEMOS EL POST DE LA NUEVA IMAGEN EN LA BASE DE DATOS
          const formData: FormData = new FormData();
          formData.append(this.nombreLogo, this.file);
          this.coleccionService.POST_LogoColecciones(formData)
          .subscribe(() => console.log('Logo cargado'));
        }

      } else {
        console.log('fallo editando');
      }
    });
  }
}
