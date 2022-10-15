import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuthJwtResponse } from "../interfaces/iauth-jwt-response";
import { IAuthCredentialsRequest } from "../interfaces/iauth-credentials-request";
import { IUserDtoGetResponse } from "../interfaces/idto-user-response";
import { IDtoProfile } from "../interfaces/idto-profile";
import { IDtoCredentials } from "../interfaces/idto-credentials";
import { IProdVideogame } from "../interfaces/iprod-videogame";
import { IProdMusic } from "../interfaces/iprod-music";
import { IProdBook } from "../interfaces/iprod-book";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<IAuthJwtResponse | null>(null);
  helper = new JwtHelperService();
  authData!: any;
  parsedData!: any;
  parsedRole!: string | null;
  parsedId!: number | undefined;

  // inviare headers al back-end per funzionamento dei preauthorize
  headers: {
    Authorization?: string;
    "Content-Type": string
  } = { "Content-Type": "application/json" };
  options = { headers: this.headers }

  constructor(private http: HttpClient, private router: Router) {

    let tokenJson = localStorage.getItem('isAuthenticated');
    // se autenticato, parse del token e autorizza chiamate REST
    if (tokenJson) {
      let token = JSON.parse(tokenJson);
      this.headers.Authorization = `Bearer ${token.token}`;
      this.options = { headers: this.headers };
    }

    this.restoreUserLogin();
  }

  /* ============ Login/Register ============ */

  restoreUserLogin() {
    const json = localStorage.getItem('isAuthenticated');
    if (json) {
      const user = JSON.parse(json);
      if (this.helper.isTokenExpired(user.token)) {
        localStorage.removeItem('isAuthenticated');
        return
      } else {
        this.authSubject.next(user);
      }
    }
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
    console.log("Successfully logged out");
  }

  // ============== POST ==============

  login(obj: IAuthCredentialsRequest): Observable<IAuthJwtResponse> {
    // LoginRequest (tramite username, password) --> <-- JwtResponse (Ritorna i dati compreso il token)
    // post dei valori del form (userName, password -> obj) 
    // se corrispondono a quelli presenti sul db, ritorna il token (con dati di ritorno = interfaccia IJwtResponse)  
    return this.http.post<IAuthJwtResponse>(environment.APIEndpoint + '/auth/login', obj).pipe(
      tap(data => {
        this.authSubject.next(data);
        localStorage.setItem('isAuthenticated', JSON.stringify(data));
      })
    )
  }

  signup(obj: IAuthCredentialsRequest): Observable<Object> {
    // in UserController (Java) nella rotta '/users' tramite @PostMapping("/user") lancia il metodo createUser() 
    return this.http.post(environment.APIEndpoint + '/users/createUser', obj);
  }

  registerAdmin(obj: IAuthCredentialsRequest): Observable<Object> {
    // solo un Admin loggato puo' creare altri Admin (necessario headers per accedere alla rotta)
    return this.http.post(environment.APIEndpoint + '/users/createAdmin', obj, this.options);
  }

  // POST Prodotti da acquistare (inseriti nel db (no lista) tramite input) 

  saveVideogame(obj: IProdVideogame): Observable<Object> {
    return this.http.post(environment.APIEndpoint + '/products/videogames/saveVideogame', obj, this.options);
  }

  saveMusic(obj: IProdMusic): Observable<Object> {
    return this.http.post(environment.APIEndpoint + '/products/music/saveMusic', obj, this.options);
  }

  saveBook(obj: IProdBook): Observable<Object> {
    return this.http.post(environment.APIEndpoint + '/products/books/saveBook', obj, this.options);
  }

  // POST Prodotti da aggiungere al carrello (cartList e db)

  addToCart(shopId: number | undefined, productId: number | undefined): Observable<Object> {
    // gli passo l'id dell'utente, dato che e' uguale all'id dello shop-system
    return this.http.post(environment.APIEndpoint + '/shop-system/' + shopId + '/' + productId + '/addToCart', this.options);
  }

  /* ============== Chiamate GET ============== */

  // get di tutti gli users[] registrati
  getAllUsersInfo(): Observable<IUserDtoGetResponse[]> {
    return this.http.get<IUserDtoGetResponse[]>(environment.APIEndpoint + '/users/getAllInfo', this.options);
  }

  // get del singolo user{} - id (IAuthToken) deve matchare con id (IUserDtoGetResponse)
  // per recuperare info dell'utente in base all'id utente associato al token
  getUserInfo(id: number | undefined): Observable<IUserDtoGetResponse> {
    return this.http.get<IUserDtoGetResponse>(environment.APIEndpoint + '/users/' + id, this.options);
  }

  // ---------------- Products ------------------

  getAllVideogames(): Observable<IProdVideogame[]> {
    return this.http.get<IProdVideogame[]>(environment.APIEndpoint + '/products/getAllVideogames', this.options);
  }

  getAllMusic(): Observable<IProdMusic[]> {
    return this.http.get<IProdMusic[]>(environment.APIEndpoint + '/products/getAllMusic', this.options);
  }

  getAllBooks(): Observable<IProdBook[]> {
    return this.http.get<IProdBook[]>(environment.APIEndpoint + '/products/getAllBooks', this.options);
  }

  // get by id (potrebbero servire in futuro)

  getVideogameById(id: number | undefined) {
    return this.http.get<IProdVideogame>(environment.APIEndpoint + '/products/' + id + '/getVideogameById', this.options);
  }

  getMusicById(id: number | undefined) {
    return this.http.get<IProdMusic>(environment.APIEndpoint + '/products/' + id + '/getMusicById', this.options);
  }

  getBookById(id: number | undefined) {
    return this.http.get<IProdBook>(environment.APIEndpoint + '/products/' + id + '/getBookById', this.options);
  }

  // ---------------- Shop System ------------------

  getShopSystemById(shopId: number | undefined) {
    return this.http.get(environment.APIEndpoint + '/shop-system/' + shopId + '/getShopSystemById', this.options);
  }

  getCartListById(shopId: number | undefined) {
    return this.http.get<IProdVideogame[] | IProdMusic[] | IProdBook[]>(environment.APIEndpoint + '/shop-system/' + shopId + '/getCartListById', this.options);
  }

  /* ============== Chiamate PUT/PATCH ============== */

  updateUserInfo(obj: IDtoProfile, id: number | undefined): Observable<Object> {
    return this.http.patch(environment.APIEndpoint + '/users/' + id + '/updateProfileInfo', obj, this.options);
  }

  updateCredentials(obj: IDtoCredentials, id: number | undefined): Observable<Object> {
    return this.http.patch(environment.APIEndpoint + '/users/' + id + '/updateCredentials', obj, this.options);
  }

  // ----------------------

  subscribeMonthly(id: number | undefined) {
    return this.http.patch(environment.APIEndpoint + '/users/' + id + '/subscribeMonthly', this.options);
  }

  subscribeSemestral(id: number | undefined) {
    return this.http.patch(environment.APIEndpoint + '/users/' + id + '/subscribeSemestral', this.options);
  }

  subscribeAnnual(id: number | undefined) {
    return this.http.patch(environment.APIEndpoint + '/users/' + id + '/subscribeAnnual', this.options);
  }

  // ----------------------

  addFiveDollars(id: number | undefined) {
    return this.http.patch(environment.APIEndpoint + '/users/' + id + '/addFiveDollars', this.options);
  }

  addTwentyFiveDollars(id: number | undefined) {
    return this.http.patch(environment.APIEndpoint + '/users/' + id + '/addTwentyFiveDollars', this.options);
  }

  addFiftyDollars(id: number | undefined) {
    return this.http.patch(environment.APIEndpoint + '/users/' + id + '/addFiftyDollars', this.options);
  }

  /* ============== Chiamate DELETE ============== */

  deleteAccount(id: number | undefined) {
    return this.http.delete(environment.APIEndpoint + '/users/' + id, this.options);
  }

  deleteFromCart(shopId: number | undefined, productId: number | undefined) {
    return this.http.delete(environment.APIEndpoint + '/shop-system/' + shopId + "/" + productId + "/deleteFromCart", this.options);
  }

  /* ======= Reload della rotta (non del browser) ======= */

  reloadRoute() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  getId(): number | undefined {
    this.authData = localStorage.getItem('isAuthenticated');
    this.parsedData = JSON.parse(this.authData);
    this.parsedId = this.parsedData.id;
    return this.parsedId;
  }

  getRole(): string | null {
    this.authData = localStorage.getItem('isAuthenticated');
    this.parsedData = JSON.parse(this.authData);
    this.parsedRole = this.parsedData.roles;
    return this.parsedRole;
  }


}
