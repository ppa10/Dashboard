import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Clases
import { Cromo, Coleccion } from '../../../clases/index';

// Servicios
import { ColeccionService } from '../../../servicios/index';

export interface OpcionSeleccionada {
  nombre: string;
  id: string;
}

@Component({
  selector: 'app-agregar-cromo-dialog',
  templateUrl: './agregar-cromo-dialog.component.html',
  styleUrls: ['./agregar-cromo-dialog.component.scss']
})
export class AgregarCromoDialogComponent implements OnInit {

  coleccionId: number;

  // CREAR CROMO
  nombreCromo: string;
  probabilidadCromo: string;
  nivelCromo: string;
  imagenCromo: string;
  cromosAgregados: Cromo [] = [];
  // tslint:disable-next-line:ban-types
  isDisabledCromo: Boolean = true;

  nombreImagenCromo: string;
  fileCromo: File;

  // Al principio cromo no creado y imagen no cargada
  // tslint:disable-next-line:ban-types
  imagenCargadoCromo: Boolean = false;

    // Opciones para mostrar en la lista desplegable para seleccionar el tipo de juego que listar
    opcionesProbabilidad: OpcionSeleccionada[] = [
      {nombre: 'Muy baja', id: 'probabilidadMuyBaja'},
      {nombre: 'Baja', id: 'probabilidadBaja'},
      {nombre: 'Media', id: 'probabilidadMedia'},
      {nombre: 'Alta', id: 'probabilidadAlta'},
      {nombre: 'Muy alta', id: 'probabilidadMuyAlta'},

    ];

    opcionSeleccionadaProbabilidad: string;

      // Opciones para mostrar en la lista desplegable para seleccionar el tipo de juego que listar
    opcionesNivel: OpcionSeleccionada[] = [
        {nombre: 'Diamante', id: 'nivelDiamante'},
        {nombre: 'Platino', id: 'nivelPlatino'},
        {nombre: 'Oro', id: 'nivelOro'},
        {nombre: 'Plata', id: 'nivelPlata'},
        {nombre: 'Bronce', id: 'nivelBronce'},
    ];
    opcionSeleccionadaNivel: string;


  // PONEMOS LAS COLUMNAS DE LA TABLA Y LA LISTA QUE TENDRÁ LA INFORMACIÓN QUE QUEREMOS MOSTRAR
  displayedColumns: string[] = ['nombreCromo', 'probabilidadCromo', 'nivelCromo', ' '];


  constructor(  private coleccionService: ColeccionService,
                private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<AgregarCromoDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // Recogemos los datos que le pasamos del otro componente
    this.coleccionId = this.data.coleccionId;
  }

  AgregarCromoColeccion() {

    console.log('Entro a asignar el cromo ' + this.nombreCromo);
    console.log('Entro a asignar el cromo a la coleccionID' + this.coleccionId);
    console.log(this.nombreImagenCromo );

    this.coleccionService.POST_CromoColeccion(
      new Cromo(this.nombreCromo, this.nombreImagenCromo , this.probabilidadCromo, this.nivelCromo), this.coleccionId)
    .subscribe((res) => {
      if (res != null) {
        console.log('asignado correctamente');
        this.CromosAgregados(res);
        this.LimpiarCampos();

         // Hago el POST de la imagen SOLO si hay algo cargado. Ese boolean se cambiará en la función ExaminarImagenCromo
        if (this.imagenCargadoCromo === true) {

          // Hacemos el POST de la nueva imagen en la base de datos recogida de la función ExaminarImagenCromo
          const formData: FormData = new FormData();
          formData.append(this.nombreImagenCromo, this.fileCromo);
          this.coleccionService.POST_ImagenCromo(formData)
          .subscribe(() => console.log('Imagen cargado'));
        }
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
    console.log('Id cromo ' + this.coleccionId);
    this.coleccionService.DELETE_Cromo(cromo.id, this.coleccionId)
    .subscribe(() => {
      this.CromosEliminados(cromo);
      console.log('Cromo borrado correctamente');

    });
  }

  CromosEliminados(cromo: Cromo) {
    this.cromosAgregados = this.cromosAgregados.filter(res => res.id !== cromo.id);
    return this.cromosAgregados;
  }

   // Activa la función ExaminarImagenCromo
   ActivarInputCromo() {
    console.log('Activar input');
    document.getElementById('inputCromo').click();
  }


  ExaminarImagenCromo($event) {
    this.fileCromo = $event.target.files[0];

    console.log('fichero ' + this.fileCromo.name);
    this.nombreImagenCromo = this.fileCromo.name;

    const reader = new FileReader();
    reader.readAsDataURL(this.fileCromo);
    reader.onload = () => {
      console.log('ya Cromo');
      this.imagenCargadoCromo = true;
      this.imagenCromo = reader.result.toString();
    };
  }

  OpcionProbabilidadSeleccionada() {

    // Opcion selecionada para probabilidad
    if (this.opcionSeleccionadaProbabilidad === 'probabilidadMuyBaja') {
      this.probabilidadCromo = 'Muy baja';
    }
    if (this.opcionSeleccionadaProbabilidad === 'probabilidadBaja') {
      this.probabilidadCromo = 'Baja';
    }

    if (this.opcionSeleccionadaProbabilidad === 'probabilidadMedia') {
      this.probabilidadCromo = 'Media';
    }

    if (this.opcionSeleccionadaProbabilidad === 'probabilidadAlta') {
      this.probabilidadCromo = 'Alta';
    }

    if (this.opcionSeleccionadaProbabilidad === 'probabilidadMuyAlta') {
      this.probabilidadCromo = 'Muy alta';
    }
  }

  OpcionNivelSeleccionado() {
    // Opcion selecionada para nivel
    if (this.opcionSeleccionadaNivel === 'nivelDiamante') {
      this.nivelCromo = 'Diamante';
    }
    if (this.opcionSeleccionadaNivel === 'nivelPlatino') {
      this.nivelCromo = 'Platino';
    }

    if (this.opcionSeleccionadaNivel === 'nivelOro') {
      this.nivelCromo = 'Oro';
    }

    if (this.opcionSeleccionadaNivel === 'nivelPlata') {
      this.nivelCromo = 'Plata';
    }

    if (this.opcionSeleccionadaNivel === 'nivelBronce') {
      this.nivelCromo = 'Bronce';
    }
  }

  LimpiarCampos() {
      this.nombreCromo = undefined;
      this.probabilidadCromo = undefined;
      this.nivelCromo = null;
      this.isDisabledCromo = true;
      this.imagenCargadoCromo = false;
      this.imagenCromo = undefined;
      this.nombreImagenCromo = undefined;
      this.opcionSeleccionadaProbabilidad = null;
      this.opcionSeleccionadaNivel = null;
  }

  Disabled() {

  if (this.nombreCromo === undefined || this.probabilidadCromo === undefined || this.nivelCromo === undefined ||
        this.nivelCromo === '' || this.probabilidadCromo === '' || this.nivelCromo === null) {
        this.isDisabledCromo = true;
  } else {
        this.isDisabledCromo = false;
    }
  }

}
