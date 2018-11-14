import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Infractor } from '../../../models/infractor';
import { TipoDocumento } from '../../../models/tipoDocumento';
import { Grado } from '../../../models/grado';

import { InfractorService } from '../../../services/infractor.service';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { GradoService } from '../../../services/grado.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-infractor-detail',
  templateUrl: './infractor-detail.component.html',
  styles: []
})
export class InfractorDetailComponent implements OnInit {
  estado: boolean;
  tipoDocumento: number;
  grado: number;
  infractor = new Infractor();

  constructor(
    private route: ActivatedRoute,
    public infractorService: InfractorService,
    public tipoDocumentoService: TipoDocumentoService,
    public gradoService: GradoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.tipoDocumentoService.cargarTipoDocumentos().then(_ => this.tipoDocumento = this.tipoDocumentoService.tipoDocumentos[0].codigo);
    this.gradoService.cargarGrados().then(_ => this.grado = this.gradoService.grados[0].codigo);
    this.getInfractor();
  }

  getInfractor() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.infractorService.cargarInfractor(id).then((item: Infractor) => {
        this.infractor = item;
        this.tipoDocumento = this.infractor.tipoDocumento.codigo;
        this.grado = this.infractor.grado.codigo;
        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  saveInfractor() {
    if(this.validarCampos()){
      this.infractor.tipoDocumento = this.tipoDocumentoService.tipoDocumentos.filter((item: TipoDocumento) => item.codigo === +this.tipoDocumento)[0];
      this.infractor.grado = this.gradoService.grados.filter((item: Grado) => item.codigo === +this.grado)[0];
      this.infractorService.guardarInfractor(this.infractor);
    }
    else{
      this.alertService.alert("Faltan campos obligatorios");
    }
    
  }

  editInfractor() {
    if(this.validarCampos()){
      this.infractorService.actualizarInfractor(this.infractor);
    }
    else{
      this.alertService.alert("Faltan campos obligatorios");
    }
    
  }

  deleteInfractor() {
    this.infractorService.eliminarInfractor(this.infractor);
  }

  validarCampos(){

    var c : boolean;
    c = false;

    if(this.tipoDocumento){
      if (this.infractor.identificacion){
        if (this.infractor.nombre){
          if (this.infractor.apellidos){
            if (this.grado){
              c = true;
            }
          }         
        }
      }
    }
    

    return c;
  }

}
