import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProdBook } from 'src/app/interfaces/iprod-book';
import { IProdMusic } from 'src/app/interfaces/iprod-music';
import { IProdVideogame } from 'src/app/interfaces/iprod-videogame';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';
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
  getId: number | undefined = this.authService.getId();

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private prodService: ProductsService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void { this.getAllBooks(); }

  openPurchaseDialog(prodId: number | undefined) {
    const dialogRef = this.dialog.open(MatModalPurchaseComponent, {
      data: { id: prodId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
        window.alert("Product Added to WishList");
        this.authService.reloadRoute();
      },
      (err) => {
        window.alert("Product already in WishList...");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
