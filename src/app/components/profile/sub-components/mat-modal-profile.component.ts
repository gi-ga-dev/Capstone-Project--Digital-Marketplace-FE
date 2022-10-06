import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

import { IUserResponse } from 'src/app/interfaces/iuser-response';
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
  authData: any = localStorage.getItem('isAuthenticated'); // oggetto JSON
  parsedData = JSON.parse(this.authData);                  // oggetto JSON parsed
  responseId: number = this.parsedData.id;                 // id preso dal dal JSON parsed
  user!: IUserResponse;

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
    return this.authService.updateUserInfo(this.form.value, this.responseId).subscribe(
      (resp) => {
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
