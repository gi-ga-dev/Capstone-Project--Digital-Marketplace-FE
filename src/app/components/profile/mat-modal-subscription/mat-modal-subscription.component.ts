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
  isSubscribed: boolean | undefined = this.authService.getIsSubscribed();
  accountBalance: number = this.authService.getAccountBalance();

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.getUserInfo(this.getId); }

  subscribeMonthly() {
    return this.authService.subscribeMonthly(this.getId).subscribe(
      (resp) => {
        // per un secondo controllo al momento della sub inserisco/aggiorno prop. isSubscribed/accountBalance nel local
        this.authService.setSubAndBalance(this.getId).subscribe();
        window.alert("Subscription success!");
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        // unica condizione di errore, balance non sufficiente (se gia' iscritto il button scompare di suo)  
        if (this.accountBalance < 4.90) { window.alert("Account balance insufficient..."); }
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  subscribeSemestral() {
    return this.authService.subscribeSemestral(this.getId).subscribe(
      (resp) => {
        // per un secondo controllo al momento della sub inserisco/aggiorno prop. isSubscribed/accountBalance nel local
        this.authService.setSubAndBalance(this.getId).subscribe();
        window.alert("Subscription success!");
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        // unica condizione di errore, balance non sufficiente (se gia' iscritto il button scompare di suo)  
        if (this.accountBalance < 24.90) { window.alert("Account balance insufficient..."); }
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  subscribeAnnual() {
    return this.authService.subscribeAnnual(this.getId).subscribe(
      (resp) => {
        // per un secondo controllo al momento della sub inserisco/aggiorno prop. isSubscribed/accountBalance nel local
        this.authService.setSubAndBalance(this.getId).subscribe();
        window.alert("Subscription success!");
        this.authService.reloadRoute();
        this.error = undefined;
      },
      (err) => {
        // unica condizione di errore, balance non sufficiente (se gia' iscritto il button scompare di suo)  
        if (this.accountBalance < 44.90) { window.alert("Account balance insufficient..."); }
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
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
