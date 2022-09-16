import { Component } from '@angular/core';
import { GoogleApiService } from './services/auth/google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financeiro-front';

  constructor(private readonly googleApi: GoogleApiService) {
  }

  teste() {
    this.googleApi.signOut();
  }
}
