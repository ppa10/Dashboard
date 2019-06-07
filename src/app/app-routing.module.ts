import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORTAMOS LOS COMPONENTES
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CrearGrupoComponent } from './paginas/crear-grupo/crear-grupo.component';
import { MisGruposComponent } from './paginas/mis-grupos/mis-grupos.component';
import { GrupoComponent } from './paginas/grupo/grupo.component';
import { EditarGrupoComponent } from './paginas/editar-grupo/editar-grupo.component';
import { EquiposComponent } from './paginas/equipos/equipos.component';
import { EditarEquipoComponent } from './paginas/equipos/editar-equipo/editar-equipo.component';
import { AboutClasspipComponent } from './paginas/about-classpip/about-classpip.component';
import { MisPuntosComponent } from './paginas/mis-puntos/mis-puntos.component';
import { CrearPuntoComponent } from './paginas/crear-punto/crear-punto.component';
import { JuegoComponent } from './paginas/juego/juego.component';
import { JuegoSeleccionadoActivoComponent } from './paginas/juego-seleccionado-activo/juego-seleccionado-activo.component';
// tslint:disable-next-line:max-line-length
import { AsignarPuntosComponent } from './paginas/juego-seleccionado-activo/juego-de-puntos-seleccionado-activo/asignar-puntos/asignar-puntos.component';
// tslint:disable-next-line:max-line-length
import { AlumnoSeleccionadoJuegoDePuntosComponent } from './paginas/juego-seleccionado-activo/juego-de-puntos-seleccionado-activo/alumno-seleccionado-juego-de-puntos/alumno-seleccionado-juego-de-puntos.component';
import { CrearColeccionComponent } from './paginas/crear-coleccion/crear-coleccion.component';
import { MisColeccionesComponent } from './paginas/mis-colecciones/mis-colecciones.component';
// tslint:disable-next-line:max-line-length
import { InformacionJuegoPuntosComponent } from './paginas/juego-seleccionado-activo/juego-de-puntos-seleccionado-activo/informacion-juego-puntos/informacion-juego-puntos.component';
// tslint:disable-next-line:max-line-length
import { EquipoSeleccionadoJuegoDePuntosComponent } from './paginas/juego-seleccionado-activo/juego-de-puntos-seleccionado-activo/equipo-seleccionado-juego-de-puntos/equipo-seleccionado-juego-de-puntos.component';



import { AppComponent } from './app.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio/:id', component: InicioComponent },
  { path: 'inicio/:id/crearGrupo', component: CrearGrupoComponent },
  { path: 'inicio/:id/misGrupos', component: MisGruposComponent },
  { path: 'grupo/:id', component: GrupoComponent },
  { path: 'grupo/:id/editarGrupo', component: EditarGrupoComponent },
  { path: 'grupo/:id/equiposGrupo', component: EquiposComponent },
  { path: 'grupo/:id/equiposGrupo/editarEquipo', component: EditarEquipoComponent },
  { path: 'grupo/:id/juegos', component: JuegoComponent },
  { path: 'grupo/:id/juegos/juegoSeleccionado', component: JuegoSeleccionadoActivoComponent },
  { path: 'grupo/:id/juegos/juegoSeleccionado/asignarPuntos', component: AsignarPuntosComponent },
  { path: 'grupo/:id/juegos/juegoSeleccionado/informacionAlumnoJuego', component: AlumnoSeleccionadoJuegoDePuntosComponent },
  { path: 'grupo/:id/juegos/juegoSeleccionado/informacionJuego', component: InformacionJuegoPuntosComponent },
  { path: 'grupo/:id/juegos/juegoSeleccionado/informacionEquipoJuego', component: EquipoSeleccionadoJuegoDePuntosComponent },

  { path: 'inicio/:id/crearColeccion', component: CrearColeccionComponent },
  { path: 'inicio/:id/misColecciones', component: MisColeccionesComponent },

  { path: 'aboutClasspip', component: AboutClasspipComponent },
  { path: 'inicio/:id/crearPuntos', component: CrearPuntoComponent },
  { path: 'inicio/:id/misPuntos', component: MisPuntosComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
