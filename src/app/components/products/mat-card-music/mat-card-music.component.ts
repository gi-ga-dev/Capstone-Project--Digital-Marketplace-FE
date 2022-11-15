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
  selector: 'app-mat-card-music',
  templateUrl: './mat-card-music.component.html',
  styleUrls: ['./mat-card-music.component.scss']
})
export class MatCardMusicComponent implements OnInit {

  error = undefined;
  isDiscounted!: boolean;
  msc!: IProdVideogame | IProdMusic | IProdBook;
  music: IProdMusic[] = [];
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
    // lo spinner e' visibile fino al momento della resp
    this.showSpinner = true;
    this.getAllMusic();
    // solo se autenticato carica le schede con i buttons, altrimenti solo schede
    if (localStorage.getItem("isAuthenticated")) {
      this.getRole = this.authService.getRole()?.toString();
      this.getId = this.authService.getId();
      this.showButtons = true;
    } else this.showButtons = false;
  }

  openPurchaseDialog(prodId: number | undefined) {
    // prendo id (dai prodotti ciclati in html passo id nel paramentro di questo metodo) e lo inietto nel modal purchase
    this.dialog.open(MatModalPurchaseComponent, {
      panelClass: 'purchase-dialog-cont',
      data: { id: prodId }
    });
  }

  openDeleteProdDialog(prodId: number | undefined) {
    this.dialog.open(MatModalDeleteProdComponent, {
      panelClass: 'delete-prod-dialog-cont',
      data: { id: prodId }
    });
  }

  getAllMusic() {
    return this.prodService.getAllMusic().subscribe(
      (resp) => {
        this.error = undefined;
        setTimeout(() => {
          this.music = resp;
          this.showSpinner = false;
        }, 500);
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
        this.authService.openSnackBar("Product Added to WishList", 'primary-snackbar', 3);
      },
      (err) => {
        this.authService.openSnackBar("Product already in WishList or Library...", 'primary-snackbar', 3);
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
