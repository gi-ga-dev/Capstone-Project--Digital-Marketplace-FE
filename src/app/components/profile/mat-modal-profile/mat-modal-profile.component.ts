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
  user!: IUserDtoGetResponse;
  getId: number | undefined = this.authService.getId();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Apre il modal, lo compila con i dati di ritorno (getUserInfo), al submit put dei dati
    this.getUserInfo(this.getId);
  }

  onSubmit() {
    this.updateUserInfo();
  }

  getUserInfo(id: number | undefined) {
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
    // this.form.value (obj) sono i primi 3 campi del profilo, this.getId e' l'id dell'utente a cui fare l'update
    return this.authService.updateUserInfo(this.form.value, this.getId).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.openSnackBar("Profile info changed successfully!", 'primary-snackbar', 3);
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
        this.authService.openSnackBar("All fields are mandatory!", 'primary-snackbar', 3);
      }
    )
  }

}
