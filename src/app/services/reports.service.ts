import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { Constants } from '../app.constants';

@Injectable()
export class ReportsService {

    constructor(
        private appService: AppService,
        private alertService: AlertService,
        private router: Router
    ) { }

    comparendosRealizados() {
        return this.appService.getRequest(Constants.PATH_REPORTES, '/comparendos');
    }

}