import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AlertService } from './alert.service';

import { Grado } from '../models/grado';
import { Observable, of, Subject } from 'rxjs';

import { Constants } from '../app.constants';

import {
  debounceTime, distinctUntilChanged, switchMap, filter
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class GradoService {
  grados: Grado[];
  filters$: Observable<Grado[]>;
  searchTerms = new Subject<string>();

  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.filters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterGrados(term)),
    );
  }

  cargarGrados() {
    return this.appService.getRequest(Constants.PATH_GRADOS).then((listado: Grado[]) => {
      this.grados = listado;
    }).catch(_ => {
      this.grados = [];
    });
  }

  cargarGrado(id) {
    return this.appService.getRequest(Constants.PATH_GRADOS, `/${id}`);
  }

  guardarGrado(item: Grado) {
    this.appService.postRequest(Constants.PATH_GRADOS, item).then((resp) => {
      this.alertService.log("Se inserto correctamente", () => {
        this.router.navigate(['/grado-list']);
      });
    });
  }

  actualizarGrado(item: Grado) {
    this.appService.putRequest(`${Constants.PATH_GRADOS}/${item.codigo}`, item).then((resp) => {
      this.alertService.log("Se modifico correctamente");
    });
  }

  eliminarGrado(item: Grado) {
    this.alertService.confirm("¿Está seguro que desea eliminar la grado?", opction => {
      if (opction) {
        this.appService.deleteRequest(Constants.PATH_GRADOS, `${item.codigo}`).then((resp) => {
          this.alertService.log("Se elimino correctamente", () => {
            this.router.navigate(['/grado-list']);
          });
        });
      }
    });
  }

  filterGrados(term: string) {
    if (!term.trim()) {
      return of(this.grados);
    }
    return of(this.grados.filter((item: Grado) => item.nombre.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1));
  }

}
