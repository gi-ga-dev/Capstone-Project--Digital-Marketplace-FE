import { Component, OnInit } from '@angular/core';
import { IProdMusic } from 'src/app/interfaces/iprod-music';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';

@Component({
  selector: 'app-mat-card-music',
  templateUrl: './mat-card-music.component.html',
  styleUrls: ['./mat-card-music.component.scss']
})
export class MatCardMusicComponent implements OnInit {

  error = undefined;
  isDiscounted!: boolean;
  music: IProdMusic[] = [];
  getId: number | undefined = this.authService.getId();

  constructor(
    private authService: AuthService,
    private prodService: ProductsService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void { this.getAllMusic(); }

  getAllMusic() {
    return this.prodService.getAllMusic().subscribe(
      (resp) => {
        this.error = undefined;
        this.music = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  addToCart(shopId: number | undefined, productId: number | undefined) {
    this.shopService.addToCart(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Product Added to Shopping Cart");
      },
      (err) => {
        window.alert("Product already in Shopping Cart...");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
