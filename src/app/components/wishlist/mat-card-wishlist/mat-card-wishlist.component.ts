import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';
import { MatModalPurchaseComponent } from '../../products/mat-modal-purchase/mat-modal-purchase.component';

@Component({
  selector: 'app-mat-card-wishlist',
  templateUrl: './mat-card-wishlist.component.html',
  styleUrls: ['./mat-card-wishlist.component.scss']
})
export class MatCardWishlistComponent implements OnInit {

  error = undefined;
  wishlistProducts: any[] = [];
  getId: number | undefined = this.authService.getId();
  showSpinner: boolean = false;
  showString: boolean = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void {
    // lo spinner e' visibile fino al momento della resp
    this.showSpinner = true;
    this.getWishListByShopId(this.getId);

    // dopo 0,5 sec mostrato contenuto emptyblock
    setTimeout(() => {
      this.showString = true;
    }, 400);
  }

  openPurchaseDialog(prodId: number | undefined) {
    // permette di aprire il modal purchase del prodotto cliccato nella wishlist
    this.dialog.open(MatModalPurchaseComponent, {
      panelClass: 'purchase-dialog-cont',
      data: { id: prodId }
    });
  }

  getWishListByShopId(shopId: number | undefined) {
    return this.shopService.getWishListByShopId(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        setTimeout(() => {
          this.wishlistProducts = resp;
          this.showSpinner = false;
        }, 300);
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  deleteFromWishList(shopId: number | undefined, productId: number | undefined) {
    this.shopService.deleteFromWishList(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
        this.authService.openSnackBar(err.error.text, 'primary-snackbar', 3);
        this.authService.reloadRoute();
      }
    )
  }

}
