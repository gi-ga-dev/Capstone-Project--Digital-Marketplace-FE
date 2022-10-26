import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private router: Router,
    private authService: AuthService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void {
    // spinner e get dopo 0,3 sec
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.getWishListByShopId(this.getId);
    }, 300);

    // dopo 0,4 sec mostrato contenuto emptyblock
    setTimeout(() => {
      this.showString = true;
    }, 400);
  }

  openPurchaseDialog(prodId: number | undefined) {
    // permette di aprire il modal purchase del prodotto cliccato nella wishlist
    const dialogRef = this.dialog.open(MatModalPurchaseComponent, {
      data: { id: prodId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getWishListByShopId(shopId: number | undefined) {
    return this.shopService.getWishListByShopId(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        this.wishlistProducts = resp;
      },
      (err) => {
        console.log("Il server e' ripartito, per eseguire il get faccio il reload della pagina");
        location.reload();
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
        this.authService.openSnackBar("Delete from Wishlist successfull", 'primary-snackbar', 3);
        this.authService.reloadRoute();
      }
    )
  }

}
