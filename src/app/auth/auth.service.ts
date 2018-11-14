import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../models/usuario';
import { AppService } from '../app.service';
import { AlertService } from '../services/alert.service';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  public isLogged = new Subject<boolean>();

  constructor(
    private router: Router,
    private appService: AppService,
    private alertService: AlertService
  ) { }

  isLoggedIn(): boolean {
    return (localStorage.getItem('User') ? true : false);
  }

  get user(): Usuario {
    return this.isLoggedIn() ? JSON.parse(localStorage.getItem('User')) : new Usuario();
  }

  setUser(u: Usuario) {
    localStorage.setItem('User', JSON.stringify(u));
  }

  login(user: Usuario) {
    user.clave = btoa(user.clave);
    this.appService.postRequest('login', user).then((u: Usuario) => {
      if (u) {
        u.recordar = user.recordar;
        this.setUser(u);
        this.router.navigate(['/home']);
        this.isLogged.next(true);
      } else {
        this.alertService.log("Usuario Invalido!");
      }
    });
  }

  logout() {
    localStorage.removeItem('User');
    this.router.navigate(['/login']);
    this.isLogged.next(false);
  }

  recuperar(user: Usuario) {
    this.appService.postRequest('recuperar', user).then((resp: any) => {
      this.alertService.alert(resp.text);
    });
  }

}
