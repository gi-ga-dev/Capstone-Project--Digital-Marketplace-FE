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
import { ShopsystemService } from "./shopsystem.service";
import { IProdVideogame } from "../interfaces/iprod-videogame";
import { IProdMusic } from "../interfaces/iprod-music";
import { IProdBook } from "../interfaces/iprod-book";
import { MatSnackBar } from "@angular/material/snack-bar";

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

  badgeCount!: any;
  parsedBadge!: number | undefined;

  subData!: any;
  isSubscribed!: boolean | undefined;

  balanceData!: any;
  accountBalance!: number;

  // inviare headers al back-end per funzionamento dei preauthorize
  headers: {
    Authorization?: string;
    "Content-Type": string
  } = { "Content-Type": "application/json" };
  options = { headers: this.headers }

  constructor(
    private _snackBar: MatSnackBar,
    private shopService: ShopsystemService,
    private http: HttpClient,
    private router: Router) {

    let tokenJson = localStorage.getItem('isAuthenticated');
    // Iniettare nei constructor services per autorizzare chiamate REST
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
    this.router.navigate(['/auth']);
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

  createAdmin(obj: IAuthCredentialsRequest): Observable<Object> {
    // solo un Admin loggato puo' creare altri Admin (necessario headers per accedere alla rotta)
    return this.http.post(environment.APIEndpoint + '/users/createAdmin', obj, this.options);
  }

  // ============== GET ==============

  // get di tutti gli users[] registrati
  getAllUsersInfo(): Observable<IUserDtoGetResponse[]> {
    return this.http.get<IUserDtoGetResponse[]>(environment.APIEndpoint + '/users/getAllInfo', this.options);
  }

  // get del singolo user{} - id (IAuthJwt) deve matchare con id (IUserDtoGetResponse)
  // per recuperare info dell'utente in base all'id utente associato al token
  getUserInfo(id: number | undefined): Observable<IUserDtoGetResponse> {
    return this.http.get<IUserDtoGetResponse>(environment.APIEndpoint + '/users/' + id, this.options);
  }

  // ============== PUT/PATCH ==============

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

  // ============== DELETE ==============

  deleteAccount(id: number | undefined) {
    return this.http.delete(environment.APIEndpoint + '/users/' + id, this.options);
  }

  // ============== Metodi Utili ==============

  reloadRoute() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  openSnackBar(message: string, cssClass: string, durationSec: number) {
    this._snackBar.open(message, 'Close', { panelClass: [cssClass], duration: durationSec * 1000 });
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

  getBadgeCount(): number | undefined {
    this.badgeCount = localStorage.getItem('badgeCount');
    this.parsedBadge = JSON.parse(this.badgeCount);
    return this.parsedBadge;
  }

  getIsSubscribed(): boolean | undefined {
    this.subData = localStorage.getItem('isSubscribed');
    this.isSubscribed = JSON.parse(this.subData);
    return this.isSubscribed;
  }

  getAccountBalance(): number {
    this.balanceData = localStorage.getItem('accountBalance');
    this.accountBalance = JSON.parse(this.balanceData);
    return this.accountBalance;
  }

  // ------------------------

  setCartListForBadgeCount(shopId: number | undefined): Observable<IProdVideogame[] | IProdMusic[] | IProdBook[]> {
    // get lista carrello per conteggio badge avviene quando:
    // addToCart, addFreeWithSub, commitPurchase, removeFromCart, Login, e Logout --> (rimuove dal local)
    return this.shopService.getCartListByShopId(shopId).pipe(
      tap(data => {
        localStorage.setItem('badgeCount', JSON.stringify(data.length));
      })
    )
  }

  setSubAndBalance(shopId: number | undefined): Observable<IUserDtoGetResponse> {
    return this.getUserInfo(shopId).pipe(
      tap(data => {
        localStorage.setItem('isSubscribed', JSON.stringify(data.isSubscribed));
        localStorage.setItem('accountBalance', JSON.stringify(data.accountBalance));
      })
    )
  }

}
