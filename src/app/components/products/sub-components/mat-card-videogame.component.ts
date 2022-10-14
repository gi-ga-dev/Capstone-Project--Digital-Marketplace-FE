import { Component, OnInit } from '@angular/core';
import { IProdVideogame } from 'src/app/interfaces/iprod-videogame';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-card-videogame',
  templateUrl: './mat-card-videogame.component.html',
  styleUrls: ['./mat-card-videogame.component.scss']
})
export class MatCardVideogameComponent implements OnInit {

  error = undefined;
  isDiscounted!: boolean;
  videogame!: IProdVideogame;
  videogames: IProdVideogame[] = [];
  getId: number | undefined = this.authService.getId();

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.getAllVideogames(); }

  getAllVideogames() {
    return this.authService.getAllVideogames().subscribe(
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

  addToCart(shopId: number | undefined, productId: number | undefined) {
    return this.authService.addToCart(shopId, productId).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Product Added to Shopping Cart");
        this.authService.reloadRoute();
      },
      (err) => {
        window.alert("Product already in Shopping Cart...");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  getProductById(id: number | undefined) {
    // prendo oggetto presente nel db tramite id
    return this.authService.getVideogameById(id).subscribe(
      (resp) => {
        this.error = undefined;
        this.videogame = resp;
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
