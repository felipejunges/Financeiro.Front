import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financeiro-front';

  isLoggedIn$ = this.userService.retornarUser();

  constructor(private readonly userService: UserService, private router: Router) {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
