import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from 'src/app/services/auth/google-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInfo?: UserInfo;

  constructor(private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info
    });
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  logar() {
    this.googleApi.logar();
  }

  logout() {
    this.googleApi.signOut()
  }

}
