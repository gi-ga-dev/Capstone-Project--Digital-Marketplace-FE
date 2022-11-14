import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProdBook } from 'src/app/interfaces/iprod-book';
import { IProdMusic } from 'src/app/interfaces/iprod-music';
import { IProdVideogame } from 'src/app/interfaces/iprod-videogame';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';
import { MatModalDeleteProdComponent } from '../mat-modal-delete-prod/mat-modal-delete-prod.component';
import { MatModalPurchaseComponent } from '../mat-modal-purchase/mat-modal-purchase.component';

@Component({
  selector: 'app-mat-card-videogame',
  templateUrl: './mat-card-videogame.component.html',
  styleUrls: ['./mat-card-videogame.component.scss']
})
export class MatCardVideogameComponent implements OnInit {

  error = undefined;
  isDiscounted!: boolean;
  videogame!: IProdVideogame | IProdMusic | IProdBook;
  videogames: IProdVideogame[] = [];
  getId!: number | undefined;
  getRole!: string | undefined;
  showSpinner: boolean = false;
  showButtons!: boolean;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private prodService: ProductsService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void {
    // lo spinner e' visibile per 0.3 sec prima del get all
    this.showSpinner = true;

    setTimeout(() => {
      this.showSpinner = false;
      this.getAllVideogames();
      // solo se autenticato carica le schede con i buttons, altrimenti solo schede
      if (localStorage.getItem("isAuthenticated")) {
        this.getRole = this.authService.getRole()?.toString();
        this.getId = this.authService.getId();
        this.showButtons = true;
      } else this.showButtons = false;
    }, 300);
  }

  openPurchaseDialog(prodId: number | undefined) {
    // prendo id (dai prodotti ciclati in html passo id nel paramentro di questo metodo) e lo inietto nel modal purchase
    const dialogRef = this.dialog.open(MatModalPurchaseComponent, {
      panelClass: 'purchase-dialog-cont',
      data: { id: prodId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteProdDialog(prodId: number | undefined) {
    const dialogRef = this.dialog.open(MatModalDeleteProdComponent, {
      panelClass: 'delete-prod-dialog-cont',
      data: { id: prodId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllVideogames() {
    return this.prodService.getAllVideogames().subscribe(
      (resp) => {
        this.error = undefined;
        this.videogames = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  addToWishList(shopId: number | undefined, productId: number | undefined) {
    return this.shopService.addToWishList(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.openSnackBar("Product added to Wishlist", 'primary-snackbar', 3);
      },
      (err) => {
        this.authService.openSnackBar("Product already in Wishlist or Library...", 'primary-snackbar', 3);
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  deleteProduct(productId: number | undefined) {
    return this.prodService.deleteProduct(productId).subscribe(
      (resp) => {
        this.error = undefined;
      },
      (err) => {
        this.authService.openSnackBar("Product Deletion successfull...", 'primary-snackbar', 3);
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
