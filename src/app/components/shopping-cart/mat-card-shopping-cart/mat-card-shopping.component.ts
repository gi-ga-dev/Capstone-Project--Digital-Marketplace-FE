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
  showSpinner: boolean = false;
  showString: boolean = false;

  constructor(
    private authService: AuthService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void {
    // lo spinner e' visibile fino al momento della resp
    this.showSpinner = true;
    this.getCartListByShopId(this.getId);
    this.getShopSystemBasicInfo(this.getId);

    // dopo 0,5 sec mostrato contenuto emptyblock
    setTimeout(() => {
      this.showString = true;
    }, 400);
  }

  getShopSystemBasicInfo(shopId: number | undefined) {
    // ottengo lo shop system per leggere proprieta' (subTotal e prodQnt)
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
        setTimeout(() => {
          this.showSpinner = false;
          this.cartProducts = resp;
        }, 300);
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
        this.authService.openSnackBar(err.error.text, 'primary-snackbar', 3);
        this.authService.reloadRoute();
        // aggiorno carrello dopo eliminazione prodotto
        this.authService.setCartListForBadgeCount(shopId).subscribe();
      }
    )
  }

  addToWishList(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.addToWishList(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.openSnackBar("Product added to Wishlist", 'primary-snackbar', 3);
        this.authService.reloadRoute();
      },
      (err) => {
        this.authService.openSnackBar(err.error.text, 'primary-snackbar', 3);
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  commitPurchase(shopId: number | undefined) {
    return this.shopService.commitPurchase(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.openSnackBar("Purchase Completed!", 'primary-snackbar', 3);
        this.authService.reloadRoute();
        this.authService.setCartListForBadgeCount(shopId).subscribe();
      },
      (err) => {
        this.authService.openSnackBar(err.error.text, 'primary-snackbar', 3);
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
