import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MatModalSubscriptionComponent } from './mat-modal-subscription.component';
import { MatModalAddbalanceComponent } from './mat-modal-addbalance.component';
import { IUserDtoGetResponse } from 'src/app/interfaces/idto-user-response';

@Component({
  selector: 'app-mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.scss']
})
export class MatNavbarComponent implements OnInit, DoCheck {

  showSignUp: boolean = true;
  showLogin: boolean = true;
  showLogout: boolean = false;
  showProdTab: boolean = false;
  showAddBalance: boolean = false;
  showSubscription: boolean = false;

  error = undefined;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  openSubscriptionDialog() {
    const dialogRef = this.dialog.open(MatModalSubscriptionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddBalanceDialog() {
    const dialogRef = this.dialog.open(MatModalAddbalanceComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngDoCheck(): void {
    if (localStorage.key(0)) {
      // Sono loggato e controlla cambiamenti, se presente token, nascondi btns
      this.showLogout = true;
      this.showLogin = false;
      this.showSignUp = false;
      this.showAddBalance = true;
      this.showSubscription = true;
    } else {
      // Non sono loggato e nascondo il pulsante Logout
      this.showLogout = false;
      this.showLogin = true;
      this.showSignUp = true;
      this.showAddBalance = false;
      this.showSubscription = false;
    }
  }

  logout(): void {
    this.authService.logout();
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
