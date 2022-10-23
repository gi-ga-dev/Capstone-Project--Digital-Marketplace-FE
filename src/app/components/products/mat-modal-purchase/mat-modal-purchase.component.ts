import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';
import { MatModalAddbalanceComponent } from '../../profile/mat-modal-addbalance/mat-modal-addbalance.component';
import { MatModalSubscriptionComponent } from '../../profile/mat-modal-subscription/mat-modal-subscription.component';

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

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private prodService: ProductsService,
    private shopService: ShopsystemService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | undefined }) { }

  ngOnInit(): void {
    // passaggio id dalla card al modal per riferirsi all'id di quel prodotto
    this.getProductById(this.data.id);
    // aggiorno local nel momento in cui l'utente nel modal di acquisto e metto
    // prop. isSubscribed e accountBalance per un check in purchaseWithSub/WithBalance (error state)
    this.authService.setSubAndBalance(this.getId).subscribe();
  }

  openSubscriptionDialog() {
    const dialogRef = this.dialog.open(MatModalSubscriptionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddBalanceDialog() {
    const dialogRef = this.dialog.open(MatModalAddbalanceComponent);
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

  purchaseWithSub(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.purchaseWithSub(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Purchase completed. Product added to your Library...");
      },
      (err) => {
        // essendo nell'errore, le condizioni sono 2 - non iscritto oppure prodotto gia' acquistato
        // get di isSubscribed from localStorage, se non e' iscritto, apre modal subscription
        if (this.isSubscribed == false) {
          this.openSubscriptionDialog();
        } else window.alert("Product is already in your Library!");
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
        // essendo nell'errore, le condizioni sono 2 - balance non sufficiente oppure prodotto gia' acquistato
        // prezzo prodotto e accountbalance per comparazione, se balance inferiore aprire modal addBalance
        if (this.accountBalance < this.product.price) {
          this.openAddBalanceDialog();
        } else window.alert("Product is already in your Library!");
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
        this.authService.setCartListForBadgeCount(shopId).subscribe();
      },
      (err) => {
        window.alert("Product already in Shopping Cart or Library...");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }



}
