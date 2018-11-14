import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GradoService } from '../../../services/grado.service';

@Component({
  selector: 'app-grado-list',
  templateUrl: './grado-list.component.html',
  styles: []
})
export class GradoListComponent implements OnInit {
  @ViewChild('filtro') input: ElementRef;
  buscando: boolean = false;

  constructor(
    public gradoService: GradoService
  ) { }

  ngOnInit() {
    this.getGrados();
  }

  getGrados() {
    this.gradoService.cargarGrados().then(_ => this.gradoService.searchTerms.next(""));
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
    this.gradoService.searchTerms.next(term);
  }

}
