import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AlertService } from './alert.service';

import { Usuario } from '../models/usuario';
import { Observable, of, Subject } from 'rxjs';

import { Constants } from '../app.constants';

import {
  debounceTime, distinctUntilChanged, switchMap, filter
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsuarioService {
  usuarios: Usuario[];
  filters$: Observable<Usuario[]>;
  searchTerms = new Subject<string>();

  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService
  ) {
    this.filters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterUsuarios(term)),
    );
  }

  cargarUsuarios() {
    return this.appService.getRequest(Constants.PATH_USUARIOS).then((listado: Usuario[]) => {
      this.usuarios = listado.filter((item: Usuario) => item.codigo !== this.authService.user.codigo);
    }).catch(_ => {
      this.usuarios = [];
    });
  }

  cargarUsuario(id) {
    return this.appService.getRequest(Constants.PATH_USUARIOS, `/${id}`);
  }

  guardarUsuario(item: Usuario) {
    item.clave = btoa(item.clave);
    this.appService.postRequest(Constants.PATH_USUARIOS, item).then((resp) => {
      this.alertService.log("Se inserto correctamente", () => {
        this.router.navigate(['/usuario-list']);
      });
    });
  }

  actualizarUsuario(item: Usuario) {
    item.clave = btoa(item.clave);
    this.appService.putRequest(`${Constants.PATH_USUARIOS}/${item.codigo}`, item).then((resp) => {
      this.alertService.log("Se modifico correctamente");
    });
  }

  eliminarUsuario(item: Usuario) {
    this.alertService.confirm("¿Está seguro que desea eliminar la usuario?", opction => {
      if (opction) {
        this.appService.deleteRequest(Constants.PATH_USUARIOS, `${item.codigo}`).then((resp) => {
          this.alertService.log("Se elimino correctamente", () => {
            this.router.navigate(['/usuario-list']);
          });
        });
      }
    });
  }

  filterUsuarios(term: string) {
    if (!term.trim()) {
      return of(this.usuarios);
    }
    return of(this.usuarios.filter((item: Usuario) => item.identificacion.toString().toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1 || item.apellidos.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1 || item.correo.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1 || item.nombre.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1 || (item.estado ? 'Activo' : 'Inactivo').indexOf(term) > -1));
  }
}
