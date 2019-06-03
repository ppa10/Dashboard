import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { ResponseContentType, Http, Response } from '@angular/http';

// Servicios
import { PuntosInsigniasService, ProfesorService } from '../../servicios/index';

// Clases
import { Punto, Insignia } from '../../clases/index';

@Component({
  selector: 'app-mis-puntos',
  templateUrl: './mis-puntos.component.html',
  styleUrls: ['./mis-puntos.component.scss']
})
export class MisPuntosComponent implements OnInit {

  profesorId: number;

  //////////// PARA JUEGO DE PUNTOS

  puntosProfesor: Punto[];
  insigniasProfesor: Insignia[];

  // imagenInsignia: string;

  displayedColumns: string[] = ['nombre', 'descripcion', ' '];


  constructor(
    private puntosInsigniasService: PuntosInsigniasService,
    private profesorService: ProfesorService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private http: Http) { }

  ngOnInit() {

    // REALMENTE LA APP FUNCIONARÁ COGIENDO AL PROFESOR DEL SERVICIO, NO OBSTANTE AHORA LO RECOGEMOS DE LA URL
    // this.profesorId = this.profesorService.RecibirProfesorIdDelServicio();
    this.profesorId = Number (this.route.snapshot.paramMap.get('id'));

    console.log(this.profesorId);

    this.PuntosDelProfesor();
    console.log(this.puntosProfesor);

    this. InsigniasDelProfesor();
    console.log(this.insigniasProfesor);

  }

  // ImagenInsignia(insignas: Insignia) {

  //   console.log('entro a buscar insignia y foto');
  //   console.log(insignas.Imagen);
  //   // Si el equipo tiene una foto (recordemos que la foto no es obligatoria)
  //   if (insignas.Imagen !== undefined) {

  //     // Busca en la base de datos la imágen con el nombre registrado en equipo.FotoEquipo y la recupera
  //     this.http.get('http://localhost:3000/api/imagenes/ImagenInsignias/download/' + insignas.Imagen,
  //     { responseType: ResponseContentType.Blob })
  //     .subscribe(response => {
  //       const blob = new Blob([response.blob()], { type: 'image/jpg'});

  //       const reader = new FileReader();
  //       reader.addEventListener('load', () => {
  //         this.imagenInsignia = reader.result.toString();
  //       }, false);

  //       if (blob) {
  //         reader.readAsDataURL(blob);
  //       }
  //     });

  //     // Sino la imagenLogo será undefined para que no nos pinte la foto de otro equipo préviamente seleccionado
  //   } else {
  //     this.imagenInsignia = undefined;
  //   }
  // }
  ////////////////////////////////////////////// PARA PUNTOS ////////////////////////////////////////////////
  PuntosDelProfesor() {

    this.puntosInsigniasService.GET_Puntos(this.profesorId)
    .subscribe(puntos => {
      if (puntos[0] !== undefined) {
        console.log('Voy a dar la lista');
        this.puntosProfesor = puntos;
        console.log(this.puntosProfesor);
        this.profesorService.EnviarProfesorIdAlServicio(this.profesorId);
      } else {
        this.puntosProfesor = undefined;
      }

    });
  }

  // Utilizamos esta función para eliminar un punto de la base de datos y de la lista de añadidos recientemente
  BorrarPunto(punto: Punto) {
    this.puntosInsigniasService.DELETE_Punto(punto.id, punto.profesorId)
    .subscribe(() => {
      this.PuntosEliminados(punto);
      console.log('punto borrado correctamente');
      console.log(this.puntosProfesor);
    });
  }

  // Borramos el punto de la lista de puntos agregados
  PuntosEliminados(punto: Punto) {
    this.puntosProfesor = this.puntosProfesor.filter(res => res.id !== punto.id);
    return this.puntosProfesor;
  }

    ////////////////////////////////////////////// PARA INSIGNIAS ////////////////////////////////////////////////
    InsigniasDelProfesor() {

      this.puntosInsigniasService.GET_Insignias(this.profesorId)
      .subscribe(insignas => {
        if (insignas[0] !== undefined) {
          console.log('Voy a dar la lista');
          this.insigniasProfesor = insignas;
          console.log(this.insigniasProfesor);
          this.profesorService.EnviarProfesorIdAlServicio(this.profesorId);
        } else {
          this.insigniasProfesor = undefined;
        }

      });
    }

    // Utilizamos esta función para eliminar un punto de la base de datos y de la lista de añadidos recientemente
    BorrarInsignia(insignas: Insignia) {
      this.puntosInsigniasService.DELETE_Insignia(insignas.id, insignas.profesorId)
      .subscribe(() => {
        this.InsigniasEliminadas(insignas);
        console.log('insignia borrada correctamente');
        console.log(this.insigniasProfesor);
      });
    }

    // Borramos el punto de la lista de puntos agregados
    InsigniasEliminadas(insignas: Insignia) {
      this.insigniasProfesor = this.insigniasProfesor.filter(res => res.id !== insignas.id);
      return this.insigniasProfesor;
    }
}
