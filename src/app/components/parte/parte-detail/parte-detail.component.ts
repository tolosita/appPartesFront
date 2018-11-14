import { Component, OnInit, EventEmitter } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../auth/auth.service';

import { Parte } from '../../../models/parte';
import { Dependencia } from '../../../models/dependencia';
import { Infractor } from '../../../models/infractor';
import { TipoVehiculo } from '../../../models/tipoVehiculo';

import { ParteService } from '../../../services/parte.service';
import { DependenciaService } from '../../../services/dependencia.service';
import { InfractorService } from '../../../services/infractor.service';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';
import { TipoComparendoService } from '../../../services/tipo-comparendo.service';
import { TipoComparendo } from '../../../models/tipoComparendo';
import { ComparendoParte } from '../../../models/ComparendoParte';

@Component({
  selector: 'app-parte-detail',
  templateUrl: './parte-detail.component.html',
  styles: []
})
export class ParteDetailComponent implements OnInit {
  estado: boolean;
  dependencia: number;
  tipoVehiculo: number;
  comparendoParte = [];
  infractor: string;
  fecha: string;
  foto: File;
  urlFoto: string = "/assets/img/upload-icon.png";
  parte = new Parte();

  infractorAutoComplete = new EventEmitter<string | MaterializeAction>();

  constructor(
    private route: ActivatedRoute,
    public parteService: ParteService,
    public infractorService: InfractorService,
    public dependenciaService: DependenciaService,
    public tipoComparendoService: TipoComparendoService,
    public tipoVehiculoService: TipoVehiculoService,
    private alertService: AlertService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.getInfractores();
    this.dependenciaService.cargarDependencias().then();
    this.tipoComparendoService.cargarTipoComparendos().then();
    this.tipoVehiculoService.cargarTipoVehiculos().then(_ => this.tipoVehiculo = this.tipoVehiculoService.tipoVehiculos[0].codigo);
    this.fecha = new Date().toISOString().substring(0, 10);
    this.getParte();
  }

  getInfractores() {
    this.infractorService.cargarInfractores().then(_ => {
      var data = "{"
      this.infractorService.infractores.map((infractor) => {
        data += `"${infractor.identificacion} - ${infractor.nombre} ${infractor.apellidos}" : null,`;
      });
      data = data.substr(0, data.length - 1);
      data += "}";
      this.infractorAutoComplete.emit({ action: "autocomplete", params: [{ 'data': JSON.parse(data) }] });
    });
  }

  getParte() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.parteService.cargarParte(id).then((item: Parte) => {

        this.parte = item;
        this.dependencia = this.parte.dependencia.id;
        this.tipoVehiculo = this.parte.tipoVehiculo.codigo;
        this.infractor = `${this.parte.infractor.identificacion} - ${this.parte.infractor.nombre} ${this.parte.infractor.apellidos}`;
        this.fecha = this.parte.fecha.toString().substring(0, 10);
        this.parteService.cargarComparendoParte(id).then((comparendoParte: ComparendoParte[]) => {
          this.comparendoParte = comparendoParte.map((cp: ComparendoParte) => cp.tipoComparendo.codigo);
        });
        if (item.foto !== null) {
          this.urlFoto = "data:image/png;base64," + item.foto;
        }

        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  onFileSelection(event) {
    if (event.target.files.length !== 0) {
      this.foto = <File>event.target.files[0];

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlFoto = event.target.result;
      }
      reader.readAsDataURL(<File>event.target.files[0]);
    } else {
      this.foto = null;
      this.urlFoto = "/assets/img/upload-icon.png";
    }
  }

  saveParte() {
    if (this.validarCampos()) {
      this.parte.dependencia = this.dependenciaService.dependencias.filter((item: Dependencia) => item.id === +this.dependencia)[0];
      this.parte.tipoVehiculo = this.tipoVehiculoService.tipoVehiculos.filter((item: TipoVehiculo) => item.codigo === +this.tipoVehiculo)[0];
      this.parte.usuario = this.authService.user;
      this.parte.infractor = this.infractorService.infractores.filter((item: Infractor) => item.identificacion === +this.infractor.substring(0, this.infractor.indexOf("-") - 1))[0];
      this.parte.fecha = new Date(this.fecha.replace("-", "/"));

      this.parteService.guardarParte(this.parte, this.foto, this.comparendoParte.map((comparendo) => {
        return this.tipoComparendoService.tipoComparendos.filter((item: TipoComparendo) => item.codigo === comparendo)[0];
      }));
    } else {
      this.alertService.alert("Faltan campos obligatorios");
    }
  }

  editParte() {
    if (this.validarCampos()) {
      this.parte.dependencia = this.dependenciaService.dependencias.filter((item: Dependencia) => item.id === +this.dependencia)[0];
      this.parte.tipoVehiculo = this.tipoVehiculoService.tipoVehiculos.filter((item: TipoVehiculo) => item.codigo === +this.tipoVehiculo)[0];
      this.parte.usuario = this.authService.user;
      this.parte.infractor = this.infractorService.infractores.filter((item: Infractor) => item.identificacion === +this.infractor.substring(0, this.infractor.indexOf("-") - 1))[0];
      this.parte.fecha = new Date(this.fecha.replace("-", "/"));

      this.parteService.actualizarParte(this.parte, this.foto, this.comparendoParte.map((comparendo) => {
        return this.tipoComparendoService.tipoComparendos.filter((item: TipoComparendo) => item.codigo === comparendo)[0];
      }));
    } else {
      this.alertService.alert("Faltan campos obligatorios");
    }
  }

  deleteParte() {
    this.parteService.eliminarParte(this.parte);
  }

  validarCampos() {
    var c: boolean;
    c = false;
    if (this.fecha) {
      if (this.infractor) {
        if (this.dependencia) {
          if (this.parte.lugar) {
            if (this.comparendoParte.length != 0) {
              if (this.parte.descripcion) {
                if (this.parte.correo) {
                  c = true;
                }
              }
            }
          }
        }
      }
    }

    return c;
  }

}