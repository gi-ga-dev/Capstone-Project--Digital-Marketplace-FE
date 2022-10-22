import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';

@Component({
  selector: 'app-mat-modal-purchase',
  templateUrl: './mat-modal-purchase.component.html',
  styleUrls: ['./mat-modal-purchase.component.scss']
})
export class MatModalPurchaseComponent implements OnInit {

  error = undefined;
  product!: any;
  getId: number | undefined = this.authService.getId();

  constructor(
    private authService: AuthService,
    private prodService: ProductsService,
    private shopService: ShopsystemService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | undefined }) { }

  ngOnInit(): void { this.getProductById(this.data.id); }

  getProductById(id: number | undefined) {
    // passo id dalla card al modal, al ngOnInit faccio il get del prod con l'id, 
    // tramite obj product (resp) passo product.id all'html
    return this.prodService.getProductById(id).subscribe(
      (resp) => {
        this.error = undefined;
        this.product = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  // ---------------------------------------

  purchaseWithSub(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.purchaseWithSub(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Purchase completed. Product added to your Library...");
      },
      (err) => {
        window.alert("You are not subscribed or Product already in Shopping Cart or Library......");
        // aggiungere apertura modal subscribe

        // getIsSubscribed() nell'authService
        // if(isSubscribed == false) open Subscription Modal


        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  purchaseWithBalance(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.purchaseWithBalance(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Purchase completed. Product added to your Library...");
      },
      (err) => {
        window.alert("Balance insufficient or Product already in Shopping Cart or Library...");
        // aggiungere apertura modal add balance
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  addToCart(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.addToCart(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Product Added to Shopping Cart");
        this.authService.getCartListForBadgeCount(shopId).subscribe();
      },
      (err) => {
        window.alert("Product already in Shopping Cart or Library...");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }



}
