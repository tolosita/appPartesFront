import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TipoVehiculo } from '../../../models/tipoVehiculo';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-tipo-vehiculo-detail',
  templateUrl: './tipo-vehiculo-detail.component.html',
  styles: []
})
export class TipoVehiculoDetailComponent implements OnInit {
  estado: boolean;
  tipoVehiculo = new TipoVehiculo();

  constructor(
    private route: ActivatedRoute,
    public tipoVehiculoService: TipoVehiculoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getTipoVehiculo();
  }

  getTipoVehiculo() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.tipoVehiculoService.cargarTipoVehiculo(id).then((item: TipoVehiculo) => {
        this.tipoVehiculo = item;
        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  saveTipoVehiculo() {

    if(this.validarCampos()){
      this.tipoVehiculoService.guardarTipoVehiculo(this.tipoVehiculo);
    }
    else{
      this.alertService.alert("Faltan campos obligatorios");
    }
    
  }

  editTipoVehiculo() {
    
    if(this.validarCampos()){
      this.tipoVehiculoService.actualizarTipoVehiculo(this.tipoVehiculo);
    }
    else{
      this.alertService.alert("Faltan campos obligatorios");
    }

  }

  deleteTipoVehiculo() {
    this.tipoVehiculoService.eliminarTipoVehiculo(this.tipoVehiculo);
  }

  validarCampos(){

    var c : boolean;
    c = false;

    if(this.tipoVehiculo.tipo){
              c = true;
          }         
    

    return c;
  }

}
