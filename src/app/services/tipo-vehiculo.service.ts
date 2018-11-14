import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AlertService } from './alert.service';

import { TipoVehiculo } from '../models/tipoVehiculo';
import { Observable, of, Subject } from 'rxjs';

import { Constants } from '../app.constants';

import {
  debounceTime, distinctUntilChanged, switchMap, filter
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TipoVehiculoService {
  tipoVehiculos: TipoVehiculo[];
  filters$: Observable<TipoVehiculo[]>;
  searchTerms = new Subject<string>();

  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.filters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterTipoVehiculos(term)),
    );
  }

  cargarTipoVehiculos() {
    return this.appService.getRequest(Constants.PATH_TIPO_VEHICULOS).then((listado: TipoVehiculo[]) => {
      this.tipoVehiculos = listado;
    }).catch(_ => {
      this.tipoVehiculos = [];
    });
  }

  cargarTipoVehiculo(id) {
    return this.appService.getRequest(Constants.PATH_TIPO_VEHICULOS, `/${id}`);
  }

  guardarTipoVehiculo(item: TipoVehiculo) {
    this.appService.postRequest(Constants.PATH_TIPO_VEHICULOS, item).then((resp) => {
      this.alertService.log("Se inserto correctamente", () => {
        this.router.navigate(['/tipoVehiculo-list']);
      });
    });
  }

  actualizarTipoVehiculo(item: TipoVehiculo) {
    this.appService.putRequest(`${Constants.PATH_TIPO_VEHICULOS}/${item.codigo}`, item).then((resp) => {
      this.alertService.log("Se modifico correctamente");
    });
  }

  eliminarTipoVehiculo(item: TipoVehiculo) {
    this.alertService.confirm("¿Está seguro que desea eliminar la tipoVehiculo?", opction => {
      if (opction) {
        this.appService.deleteRequest(Constants.PATH_TIPO_VEHICULOS, `${item.codigo}`).then((resp) => {
          this.alertService.log("Se elimino correctamente", () => {
            this.router.navigate(['/tipoVehiculo-list']);
          });
        });
      }
    });
  }

  filterTipoVehiculos(term: string) {
    if (!term.trim()) {
      return of(this.tipoVehiculos);
    }
    return of(this.tipoVehiculos.filter((item: TipoVehiculo) => item.tipo.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1));
  }

}
