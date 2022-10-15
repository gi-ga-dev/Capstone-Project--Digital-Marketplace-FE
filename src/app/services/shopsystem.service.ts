import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuthJwtResponse } from "../interfaces/iauth-jwt-response";

@Injectable({
  providedIn: 'root'
})
export class ShopsystemService {

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

  constructor(private http: HttpClient, private router: Router) { }

  // ============== POST ==============

  // ============== GET ==============

  // ============== PUT/PATCH ==============

  // ============== DELETE ==============


}
