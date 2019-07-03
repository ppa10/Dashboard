import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ResponseContentType, Http, Response } from '@angular/http';
import { AgregarCromoDialogComponent } from '../agregar-cromo-dialog/agregar-cromo-dialog.component';

// Clases
import { Cromo, Coleccion } from '../../../clases/index';

// Servicios
import { ColeccionService } from '../../../servicios/index';

@Component({
  selector: 'app-editar-coleccion',
  templateUrl: './editar-coleccion.component.html',
  styleUrls: ['./editar-coleccion.component.scss']
})
export class EditarColeccionComponent implements OnInit {

  coleccion: Coleccion;
  cromosColeccion: Cromo[];

  cromo: Cromo;
  imagenCromo: string;

  nombreColeccion: string;
  // imagen coleccion
  imagenColeccion: string;
  nombreImagenColeccion: string;
  file: File;

  // tslint:disable-next-line:ban-types
  imagenCambiada: Boolean = false;

  constructor(
              private coleccionService: ColeccionService,
              public dialog: MatDialog,
              private location: Location,
              private http: Http
  ) { }

  ngOnInit() {
    this.coleccion = this.coleccionService.RecibirColeccionDelServicio();
    this.nombreColeccion = this.coleccion.Nombre;
    this. cromosColeccion = this.coleccionService.RecibirCromosColeccionDelServicio();

    // Cargo el imagen de la coleccion
    this.GET_Imagen();
    this.GET_ImagenCromo();
  }

    // Busca la imagen que tiene el nombre del coleccion.ImagenColeccion y lo carga en imagenColeccion
    GET_Imagen() {

      if (this.coleccion.ImagenColeccion !== undefined ) {
        // Busca en la base de datos la imágen con el nombre registrado en equipo.FotoEquipo y la recupera
        this.http.get('http://localhost:3000/api/imagenes/ImagenColeccion/download/' + this.coleccion.ImagenColeccion,
        { responseType: ResponseContentType.Blob })
        .subscribe(response => {
          const blob = new Blob([response.blob()], { type: 'image/jpg'});

          const reader = new FileReader();
          reader.addEventListener('load', () => {
            this.imagenColeccion = reader.result.toString();
          }, false);

          if (blob) {
            reader.readAsDataURL(blob);
          }
      });

      }
    }

     // Busca la imagen que tiene el nombre del cromo.Imagen y lo carga en imagenCromo
     GET_ImagenCromo() {

      this.cromo = this.cromosColeccion[0];

      if (this.cromo.Imagen !== undefined ) {
        // Busca en la base de datos la imágen con el nombre registrado en equipo.FotoEquipo y la recupera
        this.http.get('http://localhost:3000/api/imagenes/ImagenCromo/download/' + this.cromo.Imagen,
        { responseType: ResponseContentType.Blob })
        .subscribe(response => {
          const blob = new Blob([response.blob()], { type: 'image/jpg'});

          const reader = new FileReader();
          reader.addEventListener('load', () => {
            this.imagenCromo = reader.result.toString();
          }, false);

          if (blob) {
            reader.readAsDataURL(blob);
          }
      });
      }
    }


      // AL CLICAR EN AGREGAR LOGO NOS ACTIVARÁ LA FUNCIÓN MOSTRAR DE ABAJO
  ActivarInput() {
    console.log('Activar input');
    document.getElementById('input').click();
  }


   // Seleccionamos una foto y guarda el nombre de la foto en la variable logo
  Mostrar($event) {
    this.file = $event.target.files[0];

    console.log('fichero ' + this.file.name);
    this.nombreImagenColeccion = this.file.name;

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      console.log('ya');
      this.imagenCambiada = true;
      this.imagenColeccion = reader.result.toString();
    };
  }

  // SI QUEREMOS AÑADIR CROMOS MANUALMENTE LO HAREMOS EN UN DIALOGO
  AbrirDialogoAgregarCromoColeccion(): void {
    const dialogRef = this.dialog.open(AgregarCromoDialogComponent, {
      // width: '900px',
      // maxHeight: '600px',
      // Le pasamos solo los id del grupo y profesor ya que es lo único que hace falta para vincular los alumnos
      data: {
        coleccionId: this.coleccion.id,
      }
    });
  }

  // Una vez seleccionado un cromo, lo podemos editar o eliminar. Esta función se activará si clicamos en editar.
  // Envía el cromo específico al componente editar-cromo
  EnviarCromoEditar(cromo: Cromo) {
    console.log('voy a enviar');
    this.coleccionService.EnviarCromoAlServicio(cromo);


  }

  EditarColeccion() {
    console.log('Entro a editar');

    // tslint:disable-next-line:max-line-length
    this.coleccionService.PUT_Coleccion(new Coleccion(this.nombreColeccion, this.nombreImagenColeccion), this.coleccion.profesorId, this.coleccion.id)
    .subscribe((res) => {
      if (res != null) {
        console.log('Voy a editar la coleccion con id ' + this.coleccion.id);
        this.coleccion = res;

        if (this.imagenCambiada === true) {
          // HACEMOS EL POST DE LA NUEVA IMAGEN EN LA BASE DE DATOS
          const formData: FormData = new FormData();
          formData.append(this.nombreImagenColeccion, this.file);
          this.coleccionService.POST_ImagenColeccion(formData)
          .subscribe(() => console.log('Imagen cargada'));
        }

      } else {
        console.log('fallo editando');
      }
    });
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

}
