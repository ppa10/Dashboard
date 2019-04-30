import { Component, OnInit } from '@angular/core';

// Clases
import { Profesor } from '../../clases/index';

// Servicios
import {ProfesorService} from '../../servicios/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profesor: Profesor;
  nombre: string;
  apellido: string;

  constructor(private servicioProfesor: ProfesorService) { }

  ngOnInit() {
  }

  Autentificar() {
    console.log('voy a entrar en autentificacion');
    this.servicioProfesor.Autentificar(this.nombre, this.apellido).subscribe(
      (res) => {
        if (res != null) { // Utilizamos res porque la operacion es sincrona. Me suscrio y veo si tiene algo.
          console.log('profe existe');
          this.profesor = res[0]; // Si es diferente de null, el profesor existe y lo meto dentro de profesor
          window.location.href = '/inicio/' + this.profesor.id;
        } else {
          console.log('profe no existe');
        }
        console.log(this.profesor);
      }
    );

  }

  PasarProfesor(profesor: any) {
    this.servicioProfesor.PasarProfesor(profesor);
  }

}
