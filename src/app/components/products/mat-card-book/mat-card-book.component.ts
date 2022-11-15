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
  selector: 'app-mat-card-book',
  templateUrl: './mat-card-book.component.html',
  styleUrls: ['./mat-card-book.component.scss']
})
export class MatCardBookComponent implements OnInit {

  error = undefined;
  isDiscounted!: boolean;
  book!: IProdVideogame | IProdMusic | IProdBook;
  books: IProdBook[] = [];
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
      this.getAllBooks();
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

  getAllBooks() {
    return this.prodService.getAllBooks().subscribe(
      (resp) => {
        this.error = undefined;
        this.books = resp;
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

}
