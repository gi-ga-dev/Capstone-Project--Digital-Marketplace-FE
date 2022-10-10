import { Component, OnInit } from '@angular/core';
import { IUserDtoGetResponse } from 'src/app/interfaces/idto-user-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-addbalance',
  templateUrl: './mat-modal-addbalance.component.html',
  styleUrls: ['./mat-modal-addbalance.component.scss']
})
export class MatModalAddbalanceComponent implements OnInit {

  error = undefined;
  authData: any = localStorage.getItem('isAuthenticated'); // oggetto JSON
  parsedData = JSON.parse(this.authData);                  // oggetto JSON parsed
  responseId: number = this.parsedData.id;                 // id preso dal dal JSON parsed
  user!: IUserDtoGetResponse; // obj contenente username utente

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.getUserInfo(this.responseId); }

  addFiveDollars() {
    return this.authService.addFiveDollars(this.responseId).subscribe(
      (resp) => {
        window.alert("5$ Credits added to your Account Balance!");
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  addTwentyFiveDollars() {
    return this.authService.addTwentyFiveDollars(this.responseId).subscribe(
      (resp) => {
        window.alert("25$ Credits added to your Account Balance!");
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  addFiftyDollars() {
    return this.authService.addFiftyDollars(this.responseId).subscribe(
      (resp) => {
        window.alert("50$ Credits added to your Account Balance!");
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  getUserInfo(id: number) {
    // prendi informazioni dell'utente, leggendo il responseId --> id dei dati nel localStorage (IAuthToken)    
    return this.authService.getUserInfo(id).subscribe(
      (resp) => {
        this.error = undefined;
        this.user = resp;
      },
      (err) => {
        console.log("Ho trovato un errore nel get e faccio il reload della pagina");
        // reload della pagina per aggiornare username presente nel localStorage
        location.reload();
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
