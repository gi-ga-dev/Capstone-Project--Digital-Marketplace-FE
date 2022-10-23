import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHistoryRoutingModule } from './purchase-history-routing.module';

/* ------------- Components ----------------- */
import { PurchaseHistoryComponent } from './purchase-history.component';
import { MatCardPurchaseHistoryComponent } from './mat-card-purchase-history/mat-card-purchase-history.component';

/* ------------- Material ----------------- */
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    PurchaseHistoryComponent,
    MatCardPurchaseHistoryComponent
  ],
  imports: [
    CommonModule,
    PurchaseHistoryRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class PurchaseHistoryModule { }
