import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.scss']
})
export class MatNavbarComponent implements OnInit, DoCheck {

  showProdTab: boolean = false;
  isAuthenticated!: boolean;
  getRole: string | undefined;
  error = undefined;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    // rileva cambiamento dopo il login
    if (localStorage.key(0)) {
      this.getRole = this.authService.getRole()?.toString(); // [0] non e' consentito      
      this.isAuthenticated = true;
    } else {
      this.getRole = undefined;
      this.isAuthenticated = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  // ----------------------

  toggleProdTab() {
    if (this.showProdTab == true) {
      this.showProdTab = false;
    } else this.showProdTab = true;
  }

  hideProdTab() {
    this.showProdTab = false;
  }

}
