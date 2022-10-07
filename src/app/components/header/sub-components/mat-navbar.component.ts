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

  showFiller: boolean = false;
  showProdTab: boolean = false;

  constructor(private authService: AuthService) { }

  ngDoCheck(): void {
    if (localStorage.key(0)) {
      // Sono loggato e controlla cambiamenti, se presente token, nascondi btns
      this.showLogout = true;
      this.showLogin = false;
      this.showSignUp = false;
    } else {
      // Non sono loggato e nascondo il pulsante Logout
      this.showLogout = false;
      this.showLogin = true;
      this.showSignUp = true;
    }
  }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout();
    this.showLogout = false;
    this.showLogin = true;
    this.showSignUp = true;
  }

  toggleProdTab() {
    if (this.showProdTab == true) {
      this.showProdTab = false;
    } else this.showProdTab = true;
  }

  hideProdTab() {
    this.showProdTab = false;
  }

}
