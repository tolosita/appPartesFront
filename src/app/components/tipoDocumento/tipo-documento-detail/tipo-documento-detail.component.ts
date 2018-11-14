import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TipoDocumento } from '../../../models/tipoDocumento';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-tipo-documento-detail',
  templateUrl: './tipo-documento-detail.component.html',
  styles: []
})
export class TipoDocumentoDetailComponent implements OnInit {
  estado: boolean;
  tipoDocumento = new TipoDocumento();

  constructor(
    private route: ActivatedRoute,
    public tipoDocumentoService: TipoDocumentoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getTipoDocumento();
  }

  getTipoDocumento() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.tipoDocumentoService.cargarTipoDocumento(id).then((item: TipoDocumento) => {
        this.tipoDocumento = item;
        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  saveTipoDocumento() {

    if(this.validarCampos()){
      this.tipoDocumentoService.guardarTipoDocumento(this.tipoDocumento);
    }
    else{
      this.alertService.alert("Faltan campos obligatorios");
    }
    
  }

  editTipoDocumento() {
    
    if(this.validarCampos()){
      this.tipoDocumentoService.actualizarTipoDocumento(this.tipoDocumento);
    }
    else{
      this.alertService.alert("Faltan campos obligatorios");
    }

  }

  deleteTipoDocumento() {
    this.tipoDocumentoService.eliminarTipoDocumento(this.tipoDocumento);
  }

  validarCampos(){

    var c : boolean;
    c = false;

    if(this.tipoDocumento.tipo){
              c = true;
          }         
    

    return c;
  }

}
