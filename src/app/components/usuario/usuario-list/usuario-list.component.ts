import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UsuarioService } from '../../../services/usuario.service';
import { timeout } from 'q';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styles: []
})
export class UsuarioListComponent implements OnInit {
  @ViewChild('filtro') input: ElementRef;
  buscando: boolean = false;

  constructor(
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.cargarUsuarios().then(_ => this.usuarioService.searchTerms.next(""));
  }

  focusBuscar() {
    this.buscando = true;

    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 100);
  }

  blurBuscar() {
    if (!this.input.nativeElement.value.trim()) {
      this.buscando = false;
    }
  }

  clearBuscar() {
    this.filtrar("");
    this.input.nativeElement.value = "";
    this.buscando = false;
  }

  filtrar(term: string) {
    this.usuarioService.searchTerms.next(term);
  }

}
