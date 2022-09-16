import { Component, OnInit } from '@angular/core';
import { GoogleApiService, UserInfo } from 'src/app/services/auth/google-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userInfo?: UserInfo;
  nomeUsuario: string = "OIEE";

  constructor(private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info;
      this.nomeUsuario = info.info.name;
      console.log(info);
    })
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

}
