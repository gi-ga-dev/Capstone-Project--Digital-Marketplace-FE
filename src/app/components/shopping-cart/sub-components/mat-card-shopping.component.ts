import { Component, OnInit } from '@angular/core';
import { IProdBook } from 'src/app/interfaces/iprod-book';
import { IProdMusic } from 'src/app/interfaces/iprod-music';
import { IProdVideogame } from 'src/app/interfaces/iprod-videogame';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-card-shopping',
  templateUrl: './mat-card-shopping.component.html',
  styleUrls: ['./mat-card-shopping.component.scss']
})
export class MatCardShoppingComponent implements OnInit {

  error = undefined;
  cartProducts: any[] = [];
  getId: number | undefined = this.authService.getId();

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.getCartListById(this.getId); }

  getCartListById(shopId: number | undefined) {
    return this.authService.getCartListById(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        this.cartProducts = resp;
      },
      (err) => {
        console.log("Ho trovato un errore nel get e faccio il reload della pagina");
        location.reload();
        this.error = err.error;
        console.log(err.error);
      }
    )


  }

}