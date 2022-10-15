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
export class ProductsService {

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

  // Prodotti da acquistare (inseriti nel db (no lista) tramite input) 

  saveVideogame(obj: IProdVideogame): Observable<Object> {
    return this.http.post(environment.APIEndpoint + '/products/videogames/saveVideogame', obj, this.options);
  }

  saveMusic(obj: IProdMusic): Observable<Object> {
    return this.http.post(environment.APIEndpoint + '/products/music/saveMusic', obj, this.options);
  }

  saveBook(obj: IProdBook): Observable<Object> {
    return this.http.post(environment.APIEndpoint + '/products/books/saveBook', obj, this.options);
  }

  // ============== GET ==============

  getAllVideogames(): Observable<IProdVideogame[]> {
    return this.http.get<IProdVideogame[]>(environment.APIEndpoint + '/products/getAllVideogames', this.options);
  }

  getAllMusic(): Observable<IProdMusic[]> {
    return this.http.get<IProdMusic[]>(environment.APIEndpoint + '/products/getAllMusic', this.options);
  }

  getAllBooks(): Observable<IProdBook[]> {
    return this.http.get<IProdBook[]>(environment.APIEndpoint + '/products/getAllBooks', this.options);
  }

  getVideogameById(id: number | undefined) {
    return this.http.get<IProdVideogame>(environment.APIEndpoint + '/products/' + id + '/getVideogameById', this.options);
  }

  getMusicById(id: number | undefined) {
    return this.http.get<IProdMusic>(environment.APIEndpoint + '/products/' + id + '/getMusicById', this.options);
  }

  getBookById(id: number | undefined) {
    return this.http.get<IProdBook>(environment.APIEndpoint + '/products/' + id + '/getBookById', this.options);
  }

  // ============== PUT/PATCH ==============

  // ============== DELETE ==============


}
