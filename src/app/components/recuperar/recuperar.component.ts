import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styles: []
})
export class RecuperarComponent implements OnInit {
  user = new Usuario();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  recuperar(): void {
    this.authService.recuperar(this.user);
  }

}
