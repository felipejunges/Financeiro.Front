import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financeiro-front';

  isLoggedIn: boolean = false;

  constructor(private readonly keycloak: KeycloakService) {
  }
  
  ngOnInit(): void {
    this.setIsLoggedIn();
  }

  async setIsLoggedIn() {
    this.keycloak.isLoggedIn().then(l => {
      this.isLoggedIn = l;
    });
  }

  logout() {
    this.keycloak.logout();
  }
}
