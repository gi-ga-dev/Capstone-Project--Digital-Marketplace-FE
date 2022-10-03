import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.scss']
})
export class MatNavbarComponent implements OnInit, DoCheck {

  showSignUp: boolean = true;
  showLogin: boolean = true;
  showLogout: boolean = false;
  showFiller = false;

  constructor(private authService: AuthService) { }

  ngDoCheck(): void {
    /* se nel localStorage e' presente un access token nascondi btns */
    if (localStorage.key(0)) {
      this.showLogout = true;
      this.showLogin = false;
      this.showSignUp = false;
    }
  }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout();
    this.showLogout = false;
    this.showLogin = true;
    this.showSignUp = true;
  }

}
