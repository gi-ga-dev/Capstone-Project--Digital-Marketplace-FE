import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';
import { MatModalAddbalanceComponent } from '../../profile/mat-modal-addbalance/mat-modal-addbalance.component';

@Component({
  selector: 'app-mat-modal-purchase-withbalance',
  templateUrl: './mat-modal-purchase-withbalance.component.html',
  styleUrls: ['./mat-modal-purchase-withbalance.component.scss']
})
export class MatModalPurchaseWithbalanceComponent implements OnInit {

  error = undefined;
  product!: any;
  getId: number | undefined = this.authService.getId();
  isSubscribed: boolean | undefined = this.authService.getIsSubscribed();
  accountBalance: number = this.authService.getAccountBalance();

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private prodService: ProductsService,
    private shopService: ShopsystemService,
    // secondo inject dell'id --> dal modal purchase al modal purchaseWithBalance
    @Inject(MAT_DIALOG_DATA) public data: { id: number | undefined }) { }

  ngOnInit(): void { this.getProductById(this.data.id); }

  // ---> modal da aprire al momento dell'acquisto se utente /non ha balance
  openAddBalanceDialog() {
    const dialogRef = this.dialog.open(MatModalAddbalanceComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

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
  purchaseWithBalance(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.purchaseWithBalance(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Purchase completed. Product added to your Library...");
        //si puo' aprire il modal di acquisto anche dalla wishlist, quindi dopo l'acquisto delete e aggiorno rotta
        this.shopService.deleteFromWishList(this.getId, this.product.id).subscribe();
        this.authService.reloadRoute();
      },
      (err) => {
        // essendo nell'errore, le condizioni sono 2 - balance non sufficiente oppure prodotto gia' acquistato
        // prezzo prodotto e accountbalance per comparazione, se balance inferiore aprire modal addBalance
        if (this.accountBalance < this.product.price) {
          this.openAddBalanceDialog();
          window.alert("Credit is insufficient, please recharge your balance");
        } else window.alert("Product is already in your Library!");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
