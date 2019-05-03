import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


// IMPORTs COMPONENTES
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CrearGrupoComponent } from './paginas/crear-grupo/crear-grupo.component';

// IMPORTs CONSULTA BASE DE DATOS
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    CrearGrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

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

    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
