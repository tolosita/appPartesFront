import { Injectable } from '@angular/core';
import { Parte } from '../models/parte';
import { Observable, Subject, of } from 'rxjs';
import { AppService } from '../app.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Constants } from '../app.constants';
import { TipoComparendo } from '../models/tipoComparendo';

@Injectable()
export class ParteService {
  partes: Parte[];
  filters$: Observable<Parte[]>;
  searchTerms = new Subject<string>();

  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.filters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterpartes(term)),
    );
  }

  cargarPartes() {
    return this.appService.getRequest(Constants.PATH_PARTES).then((listado: Parte[]) => {
      this.partes = listado;
    }).catch(_ => {
      this.partes = [];
    });
  }

  cargarParte(codigo) {
    return this.appService.getRequest(Constants.PATH_PARTES, `/${codigo}`);
  }

  cargarComparendoParte(codigo) {
    return this.appService.getRequest(Constants.PATH_COMPARENDO_PARTES, `/${codigo}`);
  }

  guardarParte(item: Parte, foto: File, list: TipoComparendo[]) {
    this.appService.postRequest(Constants.PATH_PARTES, item).then((resp: Parte) => {
      this.appService.putRequest(`${Constants.PATH_COMPARENDO_PARTES}/${resp.codigo}`, list).then((r) => {
        var formData = new FormData();
        formData.append("file", foto);

        this.appService.imageRequest(`${Constants.PATH_LOAD_FILE}/${resp.codigo}`, formData).then((resp) => {
          this.alertService.log("Se inserto correctamente", () => {
            this.router.navigate(['/parte-list']);
          });
        });
      });
    });
}

  actualizarParte(item: Parte, foto: File, list: TipoComparendo[]) {
    this.appService.putRequest(`${Constants.PATH_PARTES}/${item.codigo}`, item).then((resp) => {
      this.appService.putRequest(`${Constants.PATH_COMPARENDO_PARTES}/${item.codigo}`, list).then((resp) => {
        var formData = new FormData();
        formData.append("file", foto);

        this.appService.imageRequest(`${Constants.PATH_LOAD_FILE}/${item.codigo}`, formData).then((resp) => {
          this.alertService.log("Se modifico correctamente");
        });
      });
    });
  }

  eliminarParte(item: Parte) {
    this.alertService.confirm("¿Está seguro que desea anular el Parte?", opction => {
      if (opction) {
        this.appService.deleteRequest(Constants.PATH_PARTES, `${item.codigo}`).then((resp) => {
          this.alertService.log("Se anulo correctamente", () => {
            this.router.navigate(['/parte-list']);
          });
        });
      }
    });
  }

  filterpartes(term: string) {
    if (!term.trim()) {
      return of(this.partes);
    }
    return of(this.partes.filter((item: Parte) => item.placa.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1));
  }
}