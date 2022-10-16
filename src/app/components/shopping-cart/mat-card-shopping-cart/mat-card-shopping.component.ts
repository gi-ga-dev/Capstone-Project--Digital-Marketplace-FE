import { Component, OnInit } from '@angular/core';
import { IShopSystem } from 'src/app/interfaces/ishop-system';
import { AuthService } from 'src/app/services/auth.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';

@Component({
  selector: 'app-mat-card-shopping',
  templateUrl: './mat-card-shopping.component.html',
  styleUrls: ['./mat-card-shopping.component.scss']
})
export class MatCardShoppingComponent implements OnInit {

  error = undefined;
  cartProducts: any[] = [];
  shopSystem!: IShopSystem;
  getId: number | undefined = this.authService.getId();

  constructor(
    private authService: AuthService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void {
    // da getListByShopId ottengo array da ciclare
    // da getShopSystemBasicInfo aggiorno ed ottengo la prop. cartSubtotal dove ho memorizzato il prezzo totale degli elem nel carrello
    this.getCartListByShopId(this.getId);
    this.getShopSystemBasicInfo(this.getId);
  }

  getShopSystemBasicInfo(shopId: number | undefined) {
    // ottengo lo shop system per leggere proprieta' (subTotal)
    return this.shopService.getShopSystemBasicInfo(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        this.shopSystem = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  getCartListByShopId(shopId: number | undefined) {
    // ottengo lista carrello per ciclare e riportare tutte le schede prodotto
    return this.shopService.getCartListByShopId(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        this.cartProducts = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  deleteFromCart(shopId: number | undefined, productId: number | undefined) {
    this.shopService.deleteFromCart(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
        window.alert("Delete from Shopping Cart successfull");
        this.authService.reloadRoute();
      }
    )
  }

  addToWishList(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.addToWishList(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Product added to WishList");
        this.authService.reloadRoute();
      },
      (err) => {
        window.alert("Product already in WishList...");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  commitPurchase(shopId: number | undefined) {
    return this.shopService.commitPurchase(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Purchase Completed!");
        this.authService.reloadRoute();
      },
      (err) => {
        window.alert("Account Balance is insufficient...");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
