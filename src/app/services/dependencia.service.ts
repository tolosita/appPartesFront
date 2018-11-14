import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AlertService } from './alert.service';

import { Dependencia } from '../models/dependencia';
import { Observable, of, Subject } from 'rxjs';

import { Constants } from '../app.constants';

import {
  debounceTime, distinctUntilChanged, switchMap, filter
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class DependenciaService {
  dependencias: Dependencia[];
  filters$: Observable<Dependencia[]>;
  searchTerms = new Subject<string>();

  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.filters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterDependencias(term)),
    );
  }

  cargarDependencias() {
    return this.appService.getRequest(Constants.PATH_DENPENDENCIAS).then((listado: Dependencia[]) => {
      this.dependencias = listado;
    }).catch(_ => {
      this.dependencias = [];
    });
  }

  cargarDependencia(id) {
    return this.appService.getRequest(Constants.PATH_DENPENDENCIAS, `/${id}`);
  }

  guardarDependencia(item: Dependencia) {
    this.appService.postRequest(Constants.PATH_DENPENDENCIAS, item).then((resp) => {
      this.alertService.log("Se inserto correctamente", () => {
        this.router.navigate(['/dependencia-list']);
      });
    });
  }

  actualizarDependencia(item: Dependencia) {
    this.appService.putRequest(`${Constants.PATH_DENPENDENCIAS}/${item.id}`, item).then((resp) => {
      this.alertService.log("Se modifico correctamente");
    });
  }

  eliminarDependencia(item: Dependencia) {
    this.alertService.confirm("¿Está seguro que desea eliminar la dependencia?", opction => {
      if (opction) {
        this.appService.deleteRequest(Constants.PATH_DENPENDENCIAS, `${item.id}`).then((resp) => {
          this.alertService.log("Se elimino correctamente", () => {
            this.router.navigate(['/dependencia-list']);
          });
        });
      }
    });
  }

  filterDependencias(term: string) {
    if (!term.trim()) {
      return of(this.dependencias);
    }
    return of(this.dependencias.filter((item: Dependencia) => item.abreviatura.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1 || item.nombre.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1));
  }

}
