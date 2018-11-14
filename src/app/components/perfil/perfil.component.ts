import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario';
import { AuthService } from '../../auth/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  clave: string;
  confirmClave: string;
  usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    this.usuarioService.cargarUsuario(this.authService.user.codigo).then((item: Usuario) => {
      this.usuario = item;
      this.alertService.refresh();
    });
  }

  saveUsuario() {

    if(this.validarCampos()){
      if (this.confirmClave === this.clave) {
        this.usuario.clave = this.clave;
        this.usuarioService.actualizarUsuario(this.usuario);
        this.usuarioService.cargarUsuario(this.authService.user.codigo).then((item: Usuario) => this.authService.setUser(item));
      } else {
        this.alertService.log("Las contraseñas no coinciden");
      }
    }
    else{
      this.alertService.alert("Faltan campos obligatorios");
    }
    
  }

  
  validarCampos(){

    var c : boolean;
    c = false;
    
    if(this.usuario.nombre){
      if (this.usuario.apellidos){
        if (this.usuario.usuario){
          if (this.usuario.correo){
            if (this.usuario.tipo){
              if(this.usuario.estado){
                if(this.confirmClave || this.clave)
                c = true;
              }
            }
          }         
        }
      }
    }

    return c;
  }


}
