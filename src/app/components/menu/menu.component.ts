import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers: [AuthService]
})
export class MenuComponent implements OnInit {
  logueado$: Observable<boolean>;
  nav = [];

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    this.nav = [
      { "url": '/home', "name": 'Inicio', "icon": 'home', 'confirm': false },
      { "url": '/parte-list', "name": 'Partes', "icon": 'gavel', 'confirm': false },
      {
        "name": 'Modulos', "icon": 'dashboard', 'confirm': true,
        "children": [
          { "url": '/infractor-list', "name": 'Infractores' },
          { "url": '/dependencia-list', "name": 'Dependencias' },
          { "url": '/grado-list', "name": 'Grados' },
          { "url": '/tipoComparendo-list', "name": 'Tipo de Comparendos' },
          { "url": '/tipoDocumento-list', "name": 'Tipo de Documentos' },
          { "url": '/tipoVehiculo-list', "name": 'Tipo de Vehiculos' }
        ]
      },
      { "url": '/', "name": 'Reportes', "icon": 'assignment', 'confirm': false },
      { "url": '/usuario-list', "name": 'Usuarios', "icon": 'supervisor_account', 'confirm': true },
      { "url": '/perfil', "name": 'Configuración', "icon": 'settings', 'confirm': false }
    ];
  }

  ngOnInit() {
    this.logueado$ = this.authService.isLogged.pipe(
      switchMap((term: boolean) => of(term)),
    );
  }

  routerLink(item) {
    jQuery('.collapsible a.collapsible-header.active').click();
    this.router.navigate([item.url]);
  }

  onLogout() {
    this.authService.logout();
  }

}
