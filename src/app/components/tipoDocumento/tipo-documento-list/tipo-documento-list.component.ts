import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';

@Component({
  selector: 'app-tipo-documento-list',
  templateUrl: './tipo-documento-list.component.html',
  styles: []
})
export class TipoDocumentoListComponent implements OnInit {
  @ViewChild('filtro') input: ElementRef;
  buscando: boolean = false;

  constructor(
    public tipoDocumentoService: TipoDocumentoService
  ) { }

  ngOnInit() {
    this.getTipoDocumentos();
  }

  getTipoDocumentos() {
    this.tipoDocumentoService.cargarTipoDocumentos().then(_ => this.tipoDocumentoService.searchTerms.next(""));
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
    this.tipoDocumentoService.searchTerms.next(term);
  }

}
