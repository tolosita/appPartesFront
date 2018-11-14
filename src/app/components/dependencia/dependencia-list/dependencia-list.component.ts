import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DependenciaService } from '../../../services/dependencia.service';
import { timeout } from 'q';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dependencia',
  templateUrl: './dependencia-list.component.html',
  styles: []
})
export class DependenciaListComponent implements OnInit {
  @ViewChild('filtro') input: ElementRef;
  buscando: boolean = false;

  constructor(
    public dependenciaService: DependenciaService
  ) { }

  ngOnInit() {
    this.getDependencias();
  }

  getDependencias() {
    this.dependenciaService.cargarDependencias().then(_ => this.dependenciaService.searchTerms.next(""));
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
    this.dependenciaService.searchTerms.next(term);
  }

}
