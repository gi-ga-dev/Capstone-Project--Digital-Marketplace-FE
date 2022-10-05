import { Component, OnInit } from '@angular/core';
import { IUserResponse } from 'src/app/interfaces/iuser-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-card-profile',
  templateUrl: './mat-card-profile.component.html',
  styleUrls: ['./mat-card-profile.component.scss']
})
export class MatCardProfileComponent implements OnInit {

  error = undefined;
  users!: IUserResponse[];
  user!: IUserResponse;

  authData: any = localStorage.getItem('isAuthenticated'); // oggetto JSON
  parsedData = JSON.parse(this.authData);                  // oggetto JSON parsed
  responseId: number = this.parsedData.id;                 // id preso dal dal JSON parsed

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.getUserInfo();

  }

  getAllUsersInfo() {
    return this.authService.getAllUsersInfo().subscribe(
      (resp) => {
        this.users = resp;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getUserInfo() {
    // prendi informazioni dell'utente, leggendo il responseId --> id dei dati nel localStorage (IAuthToken)    
    return this.authService.getUserInfo(this.responseId).subscribe(
      (resp) => {
        //this.responseId 
        this.user = resp;
        console.log(this.user);
      },
      (err) => {
        console.log(err);
      }
    )
  }


}
