import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';
import { MatModalSubscriptionComponent } from '../../profile/mat-modal-subscription/mat-modal-subscription.component';
import { MatModalPurchaseWithbalanceComponent } from '../mat-modal-purchase-withbalance/mat-modal-purchase-withbalance.component';
import { MatModalPurchaseWithsubComponent } from '../mat-modal-purchase-withsub/mat-modal-purchase-withsub.component';

@Component({
  selector: 'app-mat-modal-purchase',
  templateUrl: './mat-modal-purchase.component.html',
  styleUrls: ['./mat-modal-purchase.component.scss']
})
export class MatModalPurchaseComponent implements OnInit {

  error = undefined;
  product!: any;
  getId: number | undefined = this.authService.getId();
  isSubscribed: boolean | undefined = this.authService.getIsSubscribed();
  accountBalance: number = this.authService.getAccountBalance();
  showSpinner: boolean = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private prodService: ProductsService,
    private shopService: ShopsystemService,
    // primo inject id, da mat-card a mat-modal purchase
    @Inject(MAT_DIALOG_DATA) public data: { id: number | undefined }) { }

  ngOnInit(): void {
    // passaggio id dalla card al modal per riferirsi all'id di quel prodotto
    this.getProductById(this.data.id);
    // aggiorno local nel momento in cui l'utente nel modal di acquisto e metto
    // prop. isSubscribed e accountBalance per un check in purchaseWithSub/WithBalance (error state)
    this.authService.setSubAndBalance(this.getId).subscribe();
  }

  // ---> contenitori dei commit purchase with sub/balance

  openPurchaseWithSubDialog() {
    // prendo id ricevuto da mat-card e lo inietto nel secondo modal
    // aprire modal solo se e' utente iscritto
    if (this.isSubscribed == true) {
      const dialogRef = this.dialog.open(MatModalPurchaseWithsubComponent, {
        data: { id: this.data.id }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else this.openSubscriptionDialog();
  }

  openPurchaseWithBalanceDialog() {
    // prendo id ricevuto da mat-card e lo inietto nel secondo modal
    const dialogRef = this.dialog.open(MatModalPurchaseWithbalanceComponent, {
      data: { id: this.data.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSubscriptionDialog() {
    const dialogRef = this.dialog.open(MatModalSubscriptionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // ---------------------------------------

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

  addToCart(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.addToCart(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.openSnackBar("Product added to Shopping Cart", 'primary-snackbar', 3);
        this.authService.setCartListForBadgeCount(shopId).subscribe();
      },
      (err) => {
        this.authService.openSnackBar("Product already in Shopping Cart or Library...", 'primary-snackbar', 3);
        this.error = err.error;
        console.log(err.error);
      }
    )
  }



}
