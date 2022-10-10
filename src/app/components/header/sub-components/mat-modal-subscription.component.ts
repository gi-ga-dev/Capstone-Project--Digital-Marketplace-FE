import { Component, OnInit } from '@angular/core';
import { IUserDtoGetResponse } from 'src/app/interfaces/idto-user-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-subscription',
  templateUrl: './mat-modal-subscription.component.html',
  styleUrls: ['./mat-modal-subscription.component.scss']
})
export class MatModalSubscriptionComponent implements OnInit {

  error = undefined;
  authData: any = localStorage.getItem('isAuthenticated'); // oggetto JSON
  parsedData = JSON.parse(this.authData);                  // oggetto JSON parsed
  responseId: number = this.parsedData.id;                 // id preso dal dal JSON parsed
  user!: IUserDtoGetResponse; // obj contenente username utente

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.getUserInfo(this.responseId); }

  subscribeMonthly() {
    return this.authService.subscribeMonthly(this.responseId).subscribe(
      (resp) => {
        window.alert("Subscription success!");
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        window.alert("Account balance insufficient, or you are already subscribed!");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  subscribeSemestral() {
    return this.authService.subscribeSemestral(this.responseId).subscribe(
      (resp) => {
        window.alert("Subscription success!");
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        window.alert("Account balance insufficient, or you are already subscribed!");
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  subscribeAnnual() {
    return this.authService.subscribeAnnual(this.responseId).subscribe(
      (resp) => {
        window.alert("Subscription success!");
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        window.alert("Account balance insufficient, or you are already subscribed!");
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
