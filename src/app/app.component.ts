import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financeiro-front';

  constructor(private readonly keycloak: KeycloakService) {
  }

  // async isLoggedIn() {
  //   await this.keycloak.isLoggedIn();
  // }

  logout() {
    this.keycloak.logout();
  }
}
