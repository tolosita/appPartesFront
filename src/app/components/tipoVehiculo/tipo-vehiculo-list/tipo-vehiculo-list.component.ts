import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';

@Component({
  selector: 'app-tipo-vehiculo-list',
  templateUrl: './tipo-vehiculo-list.component.html',
  styles: []
})
export class TipoVehiculoListComponent implements OnInit {
  @ViewChild('filtro') input: ElementRef;
  buscando: boolean = false;

  constructor(
    public tipoVehiculoService: TipoVehiculoService
  ) { }

  ngOnInit() {
    this.getTipoVehiculos();
  }

  getTipoVehiculos() {
    this.tipoVehiculoService.cargarTipoVehiculos().then(_ => this.tipoVehiculoService.searchTerms.next(""));
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
    this.tipoVehiculoService.searchTerms.next(term);
  }

}
