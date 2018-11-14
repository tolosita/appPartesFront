import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TipoComparendoService } from '../../../services/tipo-comparendo.service';

@Component({
  selector: 'app-tipo-comparendo-list',
  templateUrl: './tipo-comparendo-list.component.html',
  styles: []
})
export class TipoComparendoListComponent implements OnInit {
  @ViewChild('filtro') input: ElementRef;
  buscando: boolean = false;

  constructor(
    public tipoComparendoService: TipoComparendoService
  ) { }

  ngOnInit() {
    this.getTipoComparendos();
  }

  getTipoComparendos() {
    this.tipoComparendoService.cargarTipoComparendos().then(_ => this.tipoComparendoService.searchTerms.next(""));
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
    this.tipoComparendoService.searchTerms.next(term);
  }

}
