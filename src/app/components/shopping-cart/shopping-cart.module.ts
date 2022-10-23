import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';

/* ------------- Components ----------------- */
import { ShoppingCartComponent } from './shopping-cart.component';
import { MatCardShoppingComponent } from './mat-card-shopping-cart/mat-card-shopping.component';

/* ------------- Material ----------------- */
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    MatCardShoppingComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ShoppingCartModule { }
