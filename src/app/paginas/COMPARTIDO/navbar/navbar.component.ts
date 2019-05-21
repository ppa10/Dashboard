import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

// Clases
import { Profesor } from '../../../clases/index';

// Servicios
import {ProfesorService} from '../../../servicios/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  @Output() public sidenavToggle = new EventEmitter();

  profesor: Profesor;

  constructor( private profesorService: ProfesorService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('inicio componente navbar');
    this.profesor = this.profesorService.RecibirProfesorDelServicio()[0];
    console.log(this.router.url);
    console.log(this.route);
    console.log(this.profesor);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
