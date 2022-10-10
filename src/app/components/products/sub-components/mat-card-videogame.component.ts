import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatModalAddbalanceComponent } from '../../header/sub-components/mat-modal-addbalance.component';
import { MatModalSubscriptionComponent } from '../../header/sub-components/mat-modal-subscription.component';

@Component({
  selector: 'app-mat-card-videogame',
  templateUrl: './mat-card-videogame.component.html',
  styleUrls: ['./mat-card-videogame.component.scss']
})
export class MatCardVideogameComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

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

  ngOnInit(): void { }

}
