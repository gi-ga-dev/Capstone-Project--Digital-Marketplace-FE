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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<IAuthJwtResponse | null>(null);
  helper = new JwtHelperService();
  error = undefined;
  userDetails: IAuthCredentialsRequest[] = [];

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

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
    console.log("Successfully logged out");
  }

  /* ============== Chiamate POST ============== */

  login(obj: IAuthCredentialsRequest): Observable<IAuthJwtResponse> {
    // LoginRequest (tramite username, password) --> <-- JwtResponse (Ritorna i dati compreso il token)
    // post dei valori del form (userName, password -> obj) 
    // se corrispondono a quelli presenti sul db, ritorna il token (con dati di ritorno = interfaccia IAuthToken)  
    return this.http.post<IAuthJwtResponse>(environment.APIEndpoint + '/auth/login', obj).pipe(
      tap(data => {
        this.authSubject.next(data);
        localStorage.setItem('isAuthenticated', JSON.stringify(data));
      })
    )
  }

  signup(obj: IAuthCredentialsRequest): Observable<Object> {
    // in UserController (Java) nella rotta '/users' tramite @PostMapping("/user") lancia il metodo createUser() 
    return this.http.post(environment.APIEndpoint + '/users/user', obj);
  }

  registerAdmin(obj: IAuthCredentialsRequest): Observable<Object> {
    // solo un Admin loggato puo' creare altri Admin (necessario headers per accedere alla rotta)
    return this.http.post(environment.APIEndpoint + '/users/admin', obj, this.options);
  }

  /* ============== Chiamate GET ============== */

  // get di tutti gli users[] registrati
  getAllUsersInfo(): Observable<IUserDtoGetResponse[]> {
    return this.http.get<IUserDtoGetResponse[]>(environment.APIEndpoint + '/users/getAllInfo', this.options);
  }

  // get del singolo user{} - id (IAuthToken) deve matchare con id (IUserDtoGetResponse)
  // per recuperare info dell'utente in base all'id utente associato al token
  getUserInfo(id: number): Observable<IUserDtoGetResponse> {
    return this.http.get<IUserDtoGetResponse>(environment.APIEndpoint + '/users/' + id, this.options);
  }

  /* ============== Chiamate PUT/PATCH ============== */

  updateUserInfo(obj: IDtoProfile, id: number): Observable<Object> {
    return this.http.patch(environment.APIEndpoint + '/users/updateProfileInfo/' + id, obj, this.options);
  }

  updateCredentials(obj: IDtoCredentials, id: number): Observable<Object> {
    return this.http.patch(environment.APIEndpoint + '/users/updateCredentials/' + id, obj, this.options);
  }

  /* ============== Chiamate DELETE ============== */

  deleteAccount(id: number) {
    return this.http.delete(environment.APIEndpoint + '/users/' + id, this.options);
  }

  /* ======= Reload della rotta (non del browser) ======= */

  reloadRoute() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }


}
