import { Component, DoCheck, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  /* se nel localStorage e' presente un access token nascondi btns */
  ngDoCheck(): void {
    if (localStorage.length >= 1) {
      this.showLogout = true;
      this.showLogin = false;
      this.showSignUp = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.showLogout = false;
    this.showLogin = true;
    this.showSignUp = true;
  }

}
