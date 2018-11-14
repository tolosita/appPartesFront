import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DependenciaListComponent } from './components/dependencia/dependencia-list/dependencia-list.component';
import { DependenciaDetailComponent } from './components/dependencia/dependencia-detail/dependencia-detail.component';
import { GradoListComponent } from './components/grado/grado-list/grado-list.component';
import { GradoDetailComponent } from './components/grado/grado-detail/grado-detail.component';
import { TipoComparendoListComponent } from './components/tipoComparendo/tipo-comparendo-list/tipo-comparendo-list.component';
import { TipoComparendoDetailComponent } from './components/tipoComparendo/tipo-comparendo-detail/tipo-comparendo-detail.component';
import { TipoDocumentoListComponent } from './components/tipoDocumento/tipo-documento-list/tipo-documento-list.component';
import { TipoDocumentoDetailComponent } from './components/tipoDocumento/tipo-documento-detail/tipo-documento-detail.component';
import { TipoVehiculoListComponent } from './components/tipoVehiculo/tipo-vehiculo-list/tipo-vehiculo-list.component';
import { TipoVehiculoDetailComponent } from './components/tipoVehiculo/tipo-vehiculo-detail/tipo-vehiculo-detail.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioDetailComponent } from './components/usuario/usuario-detail/usuario-detail.component';
import { InfractorListComponent } from './components/infractor/infractor-list/infractor-list.component';
import { InfractorDetailComponent } from './components/infractor/infractor-detail/infractor-detail.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ParteDetailComponent } from './components/parte/parte-detail/parte-detail.component';
import { ParteListComponent } from './components/parte/parte-list/parte-list.component';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AlertService } from './services/alert.service';
import { DependenciaService } from './services/dependencia.service';
import { GradoService } from './services/grado.service';
import { TipoComparendoService } from './services/tipo-comparendo.service';
import { TipoDocumentoService } from './services/tipo-documento.service';
import { TipoVehiculoService } from './services/tipo-vehiculo.service';
import { UsuarioService } from './services/usuario.service';
import { InfractorService } from './services/infractor.service';
import { ParteService } from './services/parte.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    RecuperarComponent,
    MessagesComponent,
    DependenciaListComponent,
    DependenciaDetailComponent,
    GradoListComponent,
    GradoDetailComponent,
    TipoComparendoListComponent,
    TipoComparendoDetailComponent,
    TipoDocumentoListComponent,
    TipoDocumentoDetailComponent,
    TipoVehiculoListComponent,
    TipoVehiculoDetailComponent,
    UsuarioListComponent,
    UsuarioDetailComponent,
    InfractorListComponent,
    InfractorDetailComponent,
    PerfilComponent,
    ParteDetailComponent,
    ParteListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [
    AppService,
    AuthService,
    AuthGuard,
    AlertService,
    DependenciaService,
    GradoService,
    TipoComparendoService,
    TipoDocumentoService,
    TipoVehiculoService,
    UsuarioService,
    InfractorService,
    ParteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
