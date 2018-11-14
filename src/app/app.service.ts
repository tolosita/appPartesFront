import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from './services/alert.service';

import { Constants } from './app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsImage = {
  headers: new HttpHeaders({ 'enctype': 'multipart/form-data' })
};

@Injectable()
export class AppService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  postRequest(path: string, data: any) {
    this.alertService.loader();
    let promise = new Promise((resolve, reject) => {
      this.http.post(`${Constants.API_ENDPOINT}/${path}`, data, httpOptions)
        .toPromise()
        .then(
          resp => {
            this.alertService.closeLoader();
            resolve(resp);
          },
          error => {
            this.alertService.closeLoader();
            this.alertService.alert("Ha ocurrido un error en el servidor");
            reject(error);
          },
        );
    });
    return promise;
  }

  putRequest(path: string, data: any) {
    this.alertService.loader();
    let promise = new Promise((resolve, reject) => {
      this.http.put(`${Constants.API_ENDPOINT}/${path}`, data, httpOptions)
        .toPromise()
        .then(
          resp => {
            this.alertService.closeLoader();
            resolve(resp);
          },
          error => {
            this.alertService.closeLoader();
            this.alertService.alert("Ha ocurrido un error en el servidor");
            reject(error);
          },
        );
    });
    return promise;
  }

  getRequest(path: string, data: any = '') {
    this.alertService.loader();
    let promise = new Promise((resolve, reject) => {
      this.http.get(`${Constants.API_ENDPOINT}/${path}${data}`)
        .toPromise()
        .then(
          resp => {
            this.alertService.closeLoader();
            resolve(resp);
          },
          error => {
            this.alertService.closeLoader();
            this.alertService.alert("Ha ocurrido un error en el servidor");
            reject(error);
          },
        );
    });
    return promise;
  }

  deleteRequest(path: string, data: any) {
    this.alertService.loader();
    let promise = new Promise((resolve, reject) => {
      this.http.delete(`${Constants.API_ENDPOINT}/${path}/${data}`)
        .toPromise()
        .then(
          resp => {
            this.alertService.closeLoader();
            resolve(resp);
          },
          error => {
            this.alertService.closeLoader();
            this.alertService.alert("Ha ocurrido un error en el servidor");
            reject(error);
          },
        );
    });
    return promise;
  }


  imageRequest(path: string, data: any) {
    this.alertService.loader();
    let promise = new Promise((resolve, reject) => {
      this.http.post(`${Constants.API_ENDPOINT}/${path}`, data, httpOptionsImage)
        .toPromise()
        .then(
          resp => {
            this.alertService.closeLoader();
            resolve(resp);
          },
          error => {
            this.alertService.closeLoader();
            this.alertService.alert("Ha ocurrido un error en el servidor");
            reject(error);
          },
        );
    });
    return promise;
  }

}
