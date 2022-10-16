import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistRoutingModule } from './wishlist-routing.module';

/* ------------- Components ----------------- */
import { WishlistComponent } from './wishlist.component';
import { MatCardWishlistComponent } from './mat-card-wishlist/mat-card-wishlist.component';

/* ------------- Material ----------------- */
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    WishlistComponent,
    MatCardWishlistComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class WishlistModule { }
