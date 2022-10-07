import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IUserDtoGetResponse } from 'src/app/interfaces/idto-user-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-profile',
  templateUrl: './mat-modal-profile.component.html',
  styleUrls: ['./mat-modal-profile.component.scss']
})
export class MatModalProfileComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  hide: boolean = true;
  show: boolean = false;
  authData: any = localStorage.getItem('isAuthenticated'); // oggetto JSON
  parsedData = JSON.parse(this.authData);                  // oggetto JSON parsed
  responseId: number = this.parsedData.id;                 // id preso dal dal JSON parsed
  user!: IUserDtoGetResponse;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Apre il modal, lo compila con i dati di ritorno (getUserInfo), al submit put dei dati
    this.getUserInfo(this.responseId);
  }

  onSubmit() {
    this.updateUserInfo();
  }

  getUserInfo(id: number) {
    // prendi informazioni dell'utente, leggendo il responseId --> id dei dati nel localStorage (IAuthToken)    
    return this.authService.getUserInfo(id).subscribe(
      (resp) => {
        this.error = undefined;
        this.user = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  updateUserInfo() {
    // this.form.value (obj) sono i primi 3 campi del profilo, this.responseId e' l'id dell'utente a cui fare l'update
    return this.authService.updateUserInfo(this.form.value, this.responseId).subscribe(
      (resp) => {
        this.show = true;
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
