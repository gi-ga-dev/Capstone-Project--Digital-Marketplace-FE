import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserDtoGetResponse } from 'src/app/interfaces/idto-user-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-credentials',
  templateUrl: './mat-modal-credentials.component.html',
  styleUrls: ['./mat-modal-credentials.component.scss']
})
export class MatModalCredentialsComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  user!: IUserDtoGetResponse;
  getId: number | undefined = this.authService.getId();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserInfo(this.getId);
  }

  onSubmit() {
    this.updateCredentials();
  }

  getUserInfo(id: number | undefined) {
    // prendi informazioni dell'utente, leggendo il responseId --> id dei dati nel localStorage (IAuthJwt)    
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

  updateCredentials() {
    return this.authService.updateCredentials(this.form.value, this.getId).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.openSnackBar("Credentials changed, You will be re-directed to the Login page...", 'primary-snackbar', 3);
        this.authService.logout();
      },
      (err) => {
        this.error = err.error;
        //this.authService.openSnackBar(err.message, 'primary-snackbar', 3);
        console.log(err.error);
      }
    )
  }


}
