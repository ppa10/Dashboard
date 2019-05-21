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
  { path: 'aboutClasspip', component: AboutClasspipComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
