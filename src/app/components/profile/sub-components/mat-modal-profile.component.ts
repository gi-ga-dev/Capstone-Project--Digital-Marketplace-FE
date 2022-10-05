import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('profileForm') viewProfileForm!: NgForm;
  error = undefined;
  authData: any = localStorage.getItem('isAuthenticated'); // oggetto JSON
  parsedData = JSON.parse(this.authData);                  // oggetto JSON parsed
  responseId: number = this.parsedData.id;                 // id preso dal dal JSON parsed
  user!: IUserResponse;

  profileForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    userName: new FormControl()
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Apre il modal, lo compila con i dati di ritorno (getUserInfo)
    // al submit put dei dati, (creare metodo nel service)    
    this.getUserInfo();

    this.profileForm.get('firstName')?.setValue(this.user.firstName);
  }

  onSubmit() {

  }

  getUserInfo() {
    // prendi informazioni dell'utente, leggendo il responseId --> id dei dati nel localStorage (IAuthToken)    
    return this.authService.getUserInfo(this.responseId).subscribe(
      (resp) => {
        this.user = resp;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
