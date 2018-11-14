import { Injectable, EventEmitter } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';
import { toast } from 'angular2-materialize';

declare var Materialize: any;

@Injectable()
export class AlertService {
  message: string = "";
  event;

  alertModal = new EventEmitter<string | MaterializeAction>();
  confirmModal = new EventEmitter<string | MaterializeAction>();
  loaderModal = new EventEmitter<string | MaterializeAction>();

  constructor() { }

  alert(m: string) {
    this.message = m;
    this.alertModal.emit({ action: "modal", params: ['open'] });
  }

  closeAlert() {
    this.alertModal.emit({ action: "modal", params: ['close'] });
  }

  confirm(m: string, e) {
    this.message = m;
    this.event = e;
    this.confirmModal.emit({ action: "modal", params: ['open'] });
  }

  closeConfirm(resp) {
    this.confirmModal.emit({ action: "modal", params: ['close'] });
    this.event(resp);
  }

  loader() {
    this.loaderModal.emit({ action: "modal", params: ['open'] });
  }

  closeLoader() {
    this.loaderModal.emit({ action: "modal", params: ['close'] });
  }

  log(text: string, fnc?) {
    Materialize.Toast.removeAll();

    setTimeout(() => {
      toast(text, 2000);
      fnc ? fnc() : null;
    }, 500);
  }

  refresh() {
    setTimeout(() => {
      Materialize.updateTextFields();
    }, 100);
  }
}
