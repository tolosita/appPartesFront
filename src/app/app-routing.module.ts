import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard'

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
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
import { ParteListComponent } from './components/parte/parte-list/parte-list.component';
import { ParteDetailComponent } from './components/parte/parte-detail/parte-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dependencia-list', component: DependenciaListComponent, canActivate: [AuthGuard] },
  { path: 'dependencia-detail/:id', component: DependenciaDetailComponent, canActivate: [AuthGuard] },
  { path: 'grado-list', component: GradoListComponent, canActivate: [AuthGuard] },
  { path: 'grado-detail/:id', component: GradoDetailComponent, canActivate: [AuthGuard] },
  { path: 'tipoComparendo-list', component: TipoComparendoListComponent, canActivate: [AuthGuard] },
  { path: 'tipoComparendo-detail/:id', component: TipoComparendoDetailComponent, canActivate: [AuthGuard] },
  { path: 'tipoDocumento-list', component: TipoDocumentoListComponent, canActivate: [AuthGuard] },
  { path: 'tipoDocumento-detail/:id', component: TipoDocumentoDetailComponent, canActivate: [AuthGuard] },
  { path: 'tipoVehiculo-list', component: TipoVehiculoListComponent, canActivate: [AuthGuard] },
  { path: 'tipoVehiculo-detail/:id', component: TipoVehiculoDetailComponent, canActivate: [AuthGuard] },
  { path: 'usuario-list', component: UsuarioListComponent, canActivate: [AuthGuard] },
  { path: 'usuario-detail/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard] },
  { path: 'infractor-list', component: InfractorListComponent, canActivate: [AuthGuard] },
  { path: 'infractor-detail/:id', component: InfractorDetailComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'parte-list', component: ParteListComponent, canActivate: [AuthGuard] },
  { path: 'parte-detail/:id', component: ParteDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
