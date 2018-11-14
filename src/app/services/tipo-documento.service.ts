import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AlertService } from './alert.service';

import { TipoDocumento } from '../models/tipoDocumento';
import { Observable, of, Subject } from 'rxjs';

import { Constants } from '../app.constants';

import {
  debounceTime, distinctUntilChanged, switchMap, filter
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TipoDocumentoService {
  tipoDocumentos: TipoDocumento[];
  filters$: Observable<TipoDocumento[]>;
  searchTerms = new Subject<string>();

  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.filters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterTipoDocumentos(term)),
    );
  }

  cargarTipoDocumentos() {
    return this.appService.getRequest(Constants.PATH_TIPO_DOCUMENTOS).then((listado: TipoDocumento[]) => {
      this.tipoDocumentos = listado;
    }).catch(_ => {
      this.tipoDocumentos = [];
    });
  }

  cargarTipoDocumento(id) {
    return this.appService.getRequest(Constants.PATH_TIPO_DOCUMENTOS, `/${id}`);
  }

  guardarTipoDocumento(item: TipoDocumento) {
    this.appService.postRequest(Constants.PATH_TIPO_DOCUMENTOS, item).then((resp) => {
      this.alertService.log("Se inserto correctamente", () => {
        this.router.navigate(['/tipoDocumento-list']);
      });
    });
  }

  actualizarTipoDocumento(item: TipoDocumento) {
    this.appService.putRequest(`${Constants.PATH_TIPO_DOCUMENTOS}/${item.codigo}`, item).then((resp) => {
      this.alertService.log("Se modifico correctamente");
    });
  }

  eliminarTipoDocumento(item: TipoDocumento) {
    this.alertService.confirm("¿Está seguro que desea eliminar la tipoDocumento?", opction => {
      if (opction) {
        this.appService.deleteRequest(Constants.PATH_TIPO_DOCUMENTOS, `${item.codigo}`).then((resp) => {
          this.alertService.log("Se elimino correctamente", () => {
            this.router.navigate(['/tipoDocumento-list']);
          });
        });
      }
    });
  }

  filterTipoDocumentos(term: string) {
    if (!term.trim()) {
      return of(this.tipoDocumentos);
    }
    return of(this.tipoDocumentos.filter((item: TipoDocumento) => item.tipo.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1));
  }

}
