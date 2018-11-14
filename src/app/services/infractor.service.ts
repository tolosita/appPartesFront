import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AlertService } from './alert.service';

import { Infractor } from '../models/infractor';
import { Observable, of, Subject } from 'rxjs';

import { Constants } from '../app.constants';

import {
  debounceTime, distinctUntilChanged, switchMap, filter
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class InfractorService {
  infractores: Infractor[];
  filters$: Observable<Infractor[]>;
  searchTerms = new Subject<string>();

  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.filters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterInfractores(term)),
    );
  }

  cargarInfractores() {
    return this.appService.getRequest(Constants.PATH_INFRACTORES).then((listado: Infractor[]) => {
      this.infractores = listado;
    }).catch(_ => {
      this.infractores = [];
    });
  }

  cargarInfractor(codigo) {
    return this.appService.getRequest(Constants.PATH_INFRACTORES, `/${codigo}`);
  }

  guardarInfractor(item: Infractor) {
    this.appService.postRequest(Constants.PATH_INFRACTORES, item).then((resp) => {
      this.alertService.log("Se inserto correctamente", () => {
        this.router.navigate(['/infractor-list']);
      });
    });
  }

  actualizarInfractor(item: Infractor) {
    this.appService.putRequest(`${Constants.PATH_INFRACTORES}/${item.codigo}`, item).then((resp) => {
      this.alertService.log("Se modifico correctamente");
    });
  }

  eliminarInfractor(item: Infractor) {
    this.alertService.confirm("¿Está seguro que desea eliminar la infractor?", opction => {
      if (opction) {
        this.appService.deleteRequest(Constants.PATH_INFRACTORES, `${item.codigo}`).then((resp) => {
          this.alertService.log("Se elimino correctamente", () => {
            this.router.navigate(['/infractor-list']);
          });
        });
      }
    });
  }

  filterInfractores(term: string) {
    if (!term.trim()) {
      return of(this.infractores);
    }
    return of(this.infractores.filter((item: Infractor) => item.nombre.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1));
  }
}
