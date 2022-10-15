import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { MatCardShoppingComponent } from './mat-card-shopping-cart/mat-card-shopping.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


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
    MatIconModule
  ]
})
export class ShoppingCartModule { }
