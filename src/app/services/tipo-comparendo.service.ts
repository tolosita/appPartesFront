import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AlertService } from './alert.service';

import { TipoComparendo } from '../models/tipoComparendo';
import { Observable, of, Subject } from 'rxjs';

import { Constants } from '../app.constants';

import {
  debounceTime, distinctUntilChanged, switchMap, filter
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TipoComparendoService {
  tipoComparendos: TipoComparendo[];
  filters$: Observable<TipoComparendo[]>;
  searchTerms = new Subject<string>();

  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.filters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterTipoComparendos(term)),
    );
  }

  cargarTipoComparendos() {
    return this.appService.getRequest(Constants.PATH_TIPO_COMPARENDOS).then((listado: TipoComparendo[]) => {
      this.tipoComparendos = listado;
    }).catch(_ => {
      this.tipoComparendos = [];
    });
  }

  cargarTipoComparendo(id) {
    return this.appService.getRequest(Constants.PATH_TIPO_COMPARENDOS, `/${id}`);
  }

  guardarTipoComparendo(item: TipoComparendo) {
    this.appService.postRequest(Constants.PATH_TIPO_COMPARENDOS, item).then((resp) => {
      this.alertService.log("Se inserto correctamente", () => {
        this.router.navigate(['/tipoComparendo-list']);
      });
    });
  }

  actualizarTipoComparendo(item: TipoComparendo) {
    this.appService.putRequest(`${Constants.PATH_TIPO_COMPARENDOS}/${item.codigo}`, item).then((resp) => {
      this.alertService.log("Se modifico correctamente");
    });
  }

  eliminarTipoComparendo(item: TipoComparendo) {
    this.alertService.confirm("¿Está seguro que desea eliminar la tipoComparendo?", opction => {
      if (opction) {
        this.appService.deleteRequest(Constants.PATH_TIPO_COMPARENDOS, `${item.codigo}`).then((resp) => {
          this.alertService.log("Se elimino correctamente", () => {
            this.router.navigate(['/tipoComparendo-list']);
          });
        });
      }
    });
  }

  filterTipoComparendos(term: string) {
    if (!term.trim()) {
      return of(this.tipoComparendos);
    }
    return of(this.tipoComparendos.filter((item: TipoComparendo) => item.tipo.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1));
  }

}
