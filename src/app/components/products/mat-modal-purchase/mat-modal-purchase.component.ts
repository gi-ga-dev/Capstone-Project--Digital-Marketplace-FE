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
        console.log("Ho trovato un errore nel get e faccio il reload della pagina");
        location.reload();
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  addFreeWithSub(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.addFreeWithSub(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Product Added to Shopping Cart");
        this.authService.reloadRoute();
      },
      (err) => {
        window.alert("You are not subscribed...");
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
        this.authService.reloadRoute();
      },
      (err) => {
        window.alert("Product already in Shopping Cart...");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }



}
