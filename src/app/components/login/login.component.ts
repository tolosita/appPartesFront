import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user = new Usuario();

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user && this.authService.user.recordar ? this.router.navigate(['/home']) : this.authService.logout();
  }

  login(): void {
    this.authService.login(this.user);
    this.user.clave = "";
  }

}
