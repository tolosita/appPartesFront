import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appPartesFront';

  constructor(
    private authService: AuthService
  ) { }

  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(event) {
    if (this.authService.user && !this.authService.user.recordar) {
      localStorage.removeItem('User');
    }
  }
}
