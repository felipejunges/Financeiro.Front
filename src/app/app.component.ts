import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financeiro-front';

  isLoggedIn: boolean = false;

  constructor(private readonly auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.setIsLoggedIn();
  }

  async setIsLoggedIn() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
