import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuthToken } from "../interfaces/iauth-token";
import { IAuthSubmit } from "../interfaces/iauth-submit";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject<IAuthToken | null>(null);
  private urlJsonServer = 'http://localhost:4201';
  helper = new JwtHelperService();
  error = undefined;

  constructor(private http: HttpClient, private router: Router) {
    /* this.restoreUserLogin(); */
  }

  /* ============ Login/Register ============ */

  /*   restoreUserLogin() {
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
    } */

  login(obj: IAuthSubmit): Observable<IAuthToken> {
    // post dei valori del form (userName, password -> obj) 
    // se corrispondono a quelli presenti sul db, ritorna il token (con dati di ritorno = interfaccia IAuthToken)  
    return this.http.post<IAuthToken>(environment.APIEndpoint + '/auth/login', obj).pipe(
      tap(data => {
        this.authSubject.next(data);
        localStorage.setItem('isAuthenticated', JSON.stringify(data));
      })
    )
  }

  signup(obj: IAuthSubmit) {
    // in UserController (Java) nella rotta '/users' tramite @PostMapping("/user") lancia il metodo createUser() 
    return this.http.post(environment.APIEndpoint + '/users/user', obj);
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
    console.log("Successfully logged out");
  }

  /* ======= Reload della rotta (non del browser) ======= */

  reloadRoute() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

}
