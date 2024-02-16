import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoggedIn = false;

  constructor(private readonly auth: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

}
