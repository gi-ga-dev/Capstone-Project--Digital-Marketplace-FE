import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuthJwtResponse } from "../interfaces/iauth-jwt-response";
import { IProdBook } from "../interfaces/iprod-book";
import { IProdMusic } from "../interfaces/iprod-music";
import { IProdVideogame } from "../interfaces/iprod-videogame";
import { ISalesEvent } from "../interfaces/isales-event";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  authSubject = new BehaviorSubject<IAuthJwtResponse | null>(null);

  // inviare headers al back-end per funzionamento dei preauthorize
  headers: {
    Authorization?: string;
    "Content-Type": string
  } = { "Content-Type": "application/json" };
  options = { headers: this.headers }

  constructor(private http: HttpClient) {
    let tokenJson = localStorage.getItem('isAuthenticated');
    // Iniettare nei constructor services per autorizzare chiamate REST
    if (tokenJson) {
      let token = JSON.parse(tokenJson);
      this.headers.Authorization = `Bearer ${token.token}`;
      this.options = { headers: this.headers };
    }
  }

  // ============== POST ==============

  saveCode(prodId: number | undefined): Observable<Object> {
    return this.http.post(environment.APIEndpoint + '/downloadcodes/' + prodId + '/saveCode', this.options);
  }

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

  createEvent(obj: ISalesEvent): Observable<Object> {
    return this.http.post(environment.APIEndpoint + '/products/createEvent', obj, this.options);
  }

  // ============== GET ==============

  getAllProducts(): Observable<IProdVideogame[] | IProdMusic[] | IProdBook[]> {
    return this.http.get<IProdVideogame[] | IProdMusic[] | IProdBook[]>(environment.APIEndpoint + '/products/getAllProducts');
  }

  getAllVideogames(): Observable<IProdVideogame[]> {
    return this.http.get<IProdVideogame[]>(environment.APIEndpoint + '/products/getAllVideogames');
  }

  getAllMusic(): Observable<IProdMusic[]> {
    return this.http.get<IProdMusic[]>(environment.APIEndpoint + '/products/getAllMusic');
  }

  getAllBooks(): Observable<IProdBook[]> {
    return this.http.get<IProdBook[]>(environment.APIEndpoint + '/products/getAllBooks');
  }

  getProductById(prodId: number | undefined) {
    return this.http.get<IProdVideogame | IProdMusic | IProdBook>(environment.APIEndpoint + '/products/' + prodId + '/getProductById', this.options);
  }

  // ============== PUT/PATCH ==============

  // ============== DELETE ==============


}
