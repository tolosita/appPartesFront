import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { InfractorService } from '../../../services/infractor.service';
import { timeout } from 'q';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-infractor-list',
  templateUrl: './infractor-list.component.html',
  styles: []
})
export class InfractorListComponent implements OnInit {
  @ViewChild('filtro') input: ElementRef;
  buscando: boolean = false;

  constructor(
    public infractorService: InfractorService
  ) { }

  ngOnInit() {
    this.getInfractores();
  }

  getInfractores() {
    this.infractorService.cargarInfractores().then(_ => this.infractorService.searchTerms.next(""));
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
    this.infractorService.searchTerms.next(term);
  }

}
