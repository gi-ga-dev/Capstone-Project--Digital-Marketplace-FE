import { Component, OnInit } from '@angular/core';
import { IProdBook } from 'src/app/interfaces/iprod-book';
import { IProdMusic } from 'src/app/interfaces/iprod-music';
import { IProdVideogame } from 'src/app/interfaces/iprod-videogame';
import { AuthService } from 'src/app/services/auth.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';

@Component({
  selector: 'app-mat-card-wishlist',
  templateUrl: './mat-card-wishlist.component.html',
  styleUrls: ['./mat-card-wishlist.component.scss']
})
export class MatCardWishlistComponent implements OnInit {

  error = undefined;
  wishlistProducts: any[] = [];
  getId: number | undefined = this.authService.getId();

  constructor(
    private authService: AuthService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void { this.getWishListByShopId(this.getId); }

  getWishListByShopId(shopId: number | undefined) {
    return this.shopService.getWishListByShopId(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        this.wishlistProducts = resp;
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
        window.alert("Delete from WishList successfull");
        this.authService.reloadRoute();
      }
    )
  }

}
