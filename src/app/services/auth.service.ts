import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuthToken } from "../interfaces/iauth-token";
import { IAuthSubmit } from "../interfaces/iauth-submit";
import { IUserResponse } from "../interfaces/iuser-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<IAuthToken | null>(null);
  helper = new JwtHelperService();
  error = undefined;
  userDetails: IAuthSubmit[] = [];

  /* per mandare headers al back-end e poter far funzionare i preauthorize */
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

  login(obj: IAuthSubmit): Observable<IAuthToken> {
    // LoginRequest (tramite username, password) --> <-- JwtResponse (Ritorna i dati compreso il token)
    // post dei valori del form (userName, password -> obj) 
    // se corrispondono a quelli presenti sul db, ritorna il token (con dati di ritorno = interfaccia IAuthToken)  
    return this.http.post<IAuthToken>(environment.APIEndpoint + '/auth/login', obj).pipe(
      tap(data => {
        this.authSubject.next(data);
        localStorage.setItem('isAuthenticated', JSON.stringify(data));
      })
    )
  }

  signup(obj: IAuthSubmit): Observable<Object> {
    // in UserController (Java) nella rotta '/users' tramite @PostMapping("/user") lancia il metodo createUser() 
    return this.http.post(environment.APIEndpoint + '/users/user', obj);
  }

  registerAdmin(obj: IAuthSubmit): Observable<Object> {
    // solo un Admin loggato puo' creare altri Admin (necessario headers per accedere alla rotta)
    return this.http.post(environment.APIEndpoint + '/users/admin', obj, this.options);
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
    console.log("Successfully logged out");
  }

  /* ======= Get Dati ======= */

  // get di tutti gli utenti registrati
  getAllUsersInfo(): Observable<IUserResponse[]> {
    return this.http.get<IUserResponse[]>(environment.APIEndpoint + '/users/getAllInfo', this.options);
  }

  // get del singolo utente 
  // id (IAuthToken) deve matchare con id (IUserResponse) 
  // per recuperare info dell'utente in base all'id utente associato al token
  getUserInfo(id: number): Observable<IUserResponse> {
    // mi serve per accedere al metodo read by id (Java)
    return this.http.get<IUserResponse>(environment.APIEndpoint + '/users/' + id, this.options);
  }

  getUserId() {
    // mi serve per ottenere l'id relativo all'utente
  }

  /* ======= Reload della rotta (non del browser) ======= */

  reloadRoute() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }


}
