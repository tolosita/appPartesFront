import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ParteService } from '../../../services/parte.service';

@Component({
  selector: 'app-parte-list',
  templateUrl: './parte-list.component.html',
  styles: []
})
export class ParteListComponent implements OnInit {
  @ViewChild('filtro') input: ElementRef;
  buscando: boolean = false;

  constructor(
    public parteService: ParteService
  ) { }

  ngOnInit() {
    this.getPartes();
  }

  getPartes() {
    this.parteService.cargarPartes().then(_ => this.parteService.searchTerms.next(""));
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
    this.parteService.searchTerms.next(term);
  }
}
