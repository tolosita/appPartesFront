import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styles: []
})
export class UsuarioDetailComponent implements OnInit {
  estado: boolean;
  usuario = new Usuario();

  constructor(
    private route: ActivatedRoute,
    public usuarioService: UsuarioService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.usuarioService.cargarUsuario(id).then((item: Usuario) => {
        this.usuario = item;
        this.usuario.clave = atob(this.usuario.clave);
        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  saveUsuario() {

    if(this.validarCampos()){
      this.usuarioService.guardarUsuario(this.usuario);
    }
    else{
      this.alertService.alert("Faltan campos obligatorios");
    }
    
  }

  editUsuario() {

    if(this.validarCampos()){
      this.usuarioService.actualizarUsuario(this.usuario);
    }
    else{
      this.alertService.alert("Faltan campos obligatorios");
    }
  }

  deleteUsuario() {
    this.usuarioService.eliminarUsuario(this.usuario);
  }

  validarCampos(){

    var c : boolean;
    c = false;
    
    if(this.usuario.nombre){
      if (this.usuario.apellidos){
        if (this.usuario.usuario){
          if (this.usuario.correo){
            if (this.usuario.tipo){
              if(this.usuario.clave){
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
