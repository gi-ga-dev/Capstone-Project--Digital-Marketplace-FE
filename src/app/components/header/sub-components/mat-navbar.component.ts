import { Component, DoCheck, OnInit } from '@angular/core';
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

  showProdTab: boolean = false;

  accountBalance!: number;
  isAuthenticated!: boolean;
  isSubscribed!: boolean;
  error = undefined;
  authData!: any;        // oggetto JSON
  parsedData!: any;      // oggetto JSON parsed

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    if (localStorage.key(0)) {
      // Sono loggato e controlla cambiamenti, se presente token, nascondi btns
      this.isAuthenticated = true;
      this.authData = localStorage.getItem('isAuthenticated');
      this.parsedData = JSON.parse(this.authData);
      this.accountBalance = this.parsedData.accountBalance;
      this.isSubscribed = this.parsedData.isSubscribed;
    } else { this.isAuthenticated = false; }

    if (this.isSubscribed) {

    }

  }

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

  logout(): void {
    this.authService.logout();
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
