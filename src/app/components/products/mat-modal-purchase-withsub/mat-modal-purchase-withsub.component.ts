import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';

@Component({
  selector: 'app-mat-modal-purchase-withsub',
  templateUrl: './mat-modal-purchase-withsub.component.html',
  styleUrls: ['./mat-modal-purchase-withsub.component.scss']
})
export class MatModalPurchaseWithsubComponent implements OnInit {

  error = undefined;
  product!: any;
  getId: number | undefined = this.authService.getId();

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private prodService: ProductsService,
    private shopService: ShopsystemService,
    // secondo inject dell'id --> dal modal purchase al modal purchaseWithSub
    @Inject(MAT_DIALOG_DATA) public data: { id: number | undefined }) { }

  ngOnInit(): void { this.getProductById(this.data.id); }

  getProductById(id: number | undefined) {
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

  // step finale di acquisto prodotto
  purchaseWithSub(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.purchaseWithSub(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.openSnackBar("Purchase completed. Product added to your Library...", 'primary-snackbar', 3);
        //si puo' aprire il modal di acquisto anche dalla wishlist, quindi dopo l'acquisto delete e aggiorno rotta
        this.shopService.deleteFromWishList(this.getId, this.product.id).subscribe();
        this.authService.reloadRoute();
      },
      (err) => {
        this.authService.openSnackBar(err.error.text, 'primary-snackbar', 3);
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
