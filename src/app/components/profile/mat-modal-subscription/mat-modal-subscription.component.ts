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
  getId: number | undefined = this.authService.getId();
  user!: IUserDtoGetResponse;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.getUserInfo(this.getId); }

  subscribeMonthly() {
    return this.authService.subscribeMonthly(this.getId).subscribe(
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
    return this.authService.subscribeSemestral(this.getId).subscribe(
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
    return this.authService.subscribeAnnual(this.getId).subscribe(
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

  getUserInfo(id: number | undefined) {
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
