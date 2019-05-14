import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// IMPORTs DE ANGULAR MATERIAL
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// IMPORTs COMPONENTES
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CrearGrupoComponent } from './paginas/crear-grupo/crear-grupo.component';
import { MisGruposComponent } from './paginas/mis-grupos/mis-grupos.component';
import { GrupoComponent } from './paginas/grupo/grupo.component';
import { AgregarAlumnoDialogComponent } from './paginas/crear-grupo/agregar-alumno-dialog/agregar-alumno-dialog.component';
import { EditarGrupoComponent } from './paginas/editar-grupo/editar-grupo.component';
import { EquiposComponent } from './paginas/equipos/equipos.component';
import { EditarEquipoComponent } from './paginas/equipos/editar-equipo/editar-equipo.component';
import { AgregarAlumnoEquipoComponent } from './paginas/equipos/agregar-alumno-equipo/agregar-alumno-equipo.component';

// IMPORTs CONSULTA BASE DE DATOS
import { HttpClientModule } from '@angular/common/http';

// COMPONENTES EN COMPARTIDO
import { DialogoConfirmacionComponent } from './paginas/COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    CrearGrupoComponent,
    MisGruposComponent,
    GrupoComponent,
    AgregarAlumnoDialogComponent,
    EditarGrupoComponent,
    EquiposComponent,
    EditarEquipoComponent,
    AgregarAlumnoEquipoComponent,
    DialogoConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatMenuModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSnackBarModule,

    HttpClientModule


  ],
  entryComponents: [AgregarAlumnoDialogComponent, AgregarAlumnoEquipoComponent, DialogoConfirmacionComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
