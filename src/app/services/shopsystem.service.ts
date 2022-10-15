import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuthJwtResponse } from "../interfaces/iauth-jwt-response";
import { IProdBook } from "../interfaces/iprod-book";
import { IProdMusic } from "../interfaces/iprod-music";
import { IProdVideogame } from "../interfaces/iprod-videogame";

@Injectable({
  providedIn: 'root'
})
export class ShopsystemService {

  authSubject = new BehaviorSubject<IAuthJwtResponse | null>(null);
  helper = new JwtHelperService();

  // inviare headers al back-end per funzionamento dei preauthorize
  headers: {
    Authorization?: string;
    "Content-Type": string
  } = { "Content-Type": "application/json" };
  options = { headers: this.headers }

  constructor(private http: HttpClient, private router: Router) {
    let tokenJson = localStorage.getItem('isAuthenticated');
    // Iniettare nei constructor services per autorizzare chiamate REST
    if (tokenJson) {
      let token = JSON.parse(tokenJson);
      this.headers.Authorization = `Bearer ${token.token}`;
      this.options = { headers: this.headers };
    }
  }

  // ============== POST ==============

  // Prodotti da aggiungere al liste (es. cartList) e DB 

  addToCart(shopId: number | undefined, productId: number | undefined): Observable<Object> {
    // gli passo l'id dell'utente, dato che e' uguale all'id dello shop-system
    return this.http.post(environment.APIEndpoint + '/shop-system/' + shopId + '/' + productId + '/addToCart', this.options);
  }

  // ============== GET ==============

  getShopSystemById(shopId: number | undefined) {
    return this.http.get(environment.APIEndpoint + '/shop-system/' + shopId + '/getShopSystemById', this.options);
  }

  getCartListById(shopId: number | undefined) {
    return this.http.get<IProdVideogame[] | IProdMusic[] | IProdBook[]>(environment.APIEndpoint + '/shop-system/' + shopId + '/getCartListById', this.options);
  }

  // ============== PUT/PATCH ==============

  // ============== DELETE ==============

  deleteFromCart(shopId: number | undefined, productId: number | undefined) {
    return this.http.delete(environment.APIEndpoint + '/shop-system/' + shopId + "/" + productId + "/deleteFromCart", this.options);
  }


}
