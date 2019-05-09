import { Component, OnInit } from '@angular/core';

// Clases
import { Profesor } from '../../clases/index';

// Servicios
import {ProfesorService} from '../../servicios/index';

// USARE ESTO PARA NAVEGAR A LA PAGINA DE INICIO
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profesor: Profesor;
  nombre: string;
  apellido: string;

  constructor(private servicioProfesor: ProfesorService,
              private route: Router) { }

  ngOnInit() {
  }


  Autentificar() {
    console.log('voy a entrar en autentificacion');

    this.servicioProfesor.Autentificar(this.nombre, this.apellido).subscribe(
      (res) => {
        if (res[0] !== undefined) { // Utilizamos res porque la operacion es sincrona. Me suscribo y veo si tiene algo.
          console.log('profe existe');
          this.profesor = res[0]; // Si es diferente de null, el profesor existe y lo meto dentro de profesor

          // AHORA SE LO ENVIO AL SERVICIO
          this.servicioProfesor.TomaProfesor(this.profesor);

          this.route.navigateByUrl ('/inicio/' + this.profesor.id); // DEBEMOS USAR ESTE ROUTE PARA QUE FUNCIONE
        } else {
          console.log('profe no existe');
        }
      }
    );
  }
}
