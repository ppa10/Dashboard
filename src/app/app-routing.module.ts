import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORTAMOS LOS COMPONENTES
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CrearGrupoComponent } from './paginas/crear-grupo/crear-grupo.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio/:id', component: InicioComponent },
  { path: 'inicio/:id/crearGrupo', component: CrearGrupoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
