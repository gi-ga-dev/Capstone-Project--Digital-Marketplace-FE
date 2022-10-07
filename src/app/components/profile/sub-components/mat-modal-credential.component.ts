import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserDtoGetResponse } from 'src/app/interfaces/idto-user-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-credential',
  templateUrl: './mat-modal-credential.component.html',
  styleUrls: ['./mat-modal-credential.component.scss']
})
export class MatModalCredentialComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  user!: IUserDtoGetResponse;

  authData: any = localStorage.getItem('isAuthenticated'); // oggetto JSON
  parsedData = JSON.parse(this.authData);                  // oggetto JSON parsed
  responseId: number = this.parsedData.id;                 // id preso dal dal JSON parsed

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserInfo(this.responseId);
  }

  onSubmit() {
    this.updateCredentials();
    window.alert("Credentials changed, You will be re-directed to the Login page..");
    this.authService.logout();
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

  updateCredentials() {
    return this.authService.updateCredentials(this.form.value, this.responseId).subscribe(
      (resp) => {
        // modifico username/password e lancio metodo logout() in modo da riaggiornare il sistema una volta ri-loggato
        this.error = undefined;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )

  }

}
