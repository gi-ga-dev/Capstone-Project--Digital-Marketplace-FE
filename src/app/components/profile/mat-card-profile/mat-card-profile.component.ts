import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUserDtoGetResponse } from 'src/app/interfaces/idto-user-response';
import { AuthService } from 'src/app/services/auth.service';
import { MatModalAddbalanceComponent } from '../mat-modal-addbalance/mat-modal-addbalance.component';
import { MatModalAdminComponent } from '../mat-modal-admin/mat-modal-admin.component';
import { MatModalCredentialsComponent } from '../mat-modal-credentials/mat-modal-credentials.component';
import { MatModalDeleteComponent } from '../mat-modal-delete/mat-modal-delete.component';
import { MatModalProfileComponent } from '../mat-modal-profile/mat-modal-profile.component';
import { MatModalSubscriptionComponent } from '../mat-modal-subscription/mat-modal-subscription.component';

@Component({
  selector: 'app-mat-card-profile',
  templateUrl: './mat-card-profile.component.html',
  styleUrls: ['./mat-card-profile.component.scss']
})
export class MatCardProfileComponent implements OnInit {

  error = undefined;
  user!: IUserDtoGetResponse;
  getId: number | undefined = this.authService.getId();
  getRole: string | undefined = this.authService.getRole()?.toString();

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void { this.getUserInfo(this.getId); }

  /* =========== Open Dialogues ============= */

  openAdminDialog() {
    const dialogRef = this.dialog.open(MatModalAdminComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSubscriptionDialog() {
    const dialogRef = this.dialog.open(MatModalSubscriptionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddBalanceDialog() {
    const dialogRef = this.dialog.open(MatModalAddbalanceComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* Modal Modifica Informazioni base */
  openProfileDialog() {
    const dialogRef = this.dialog.open(MatModalProfileComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* Modal Modifica Credenziali di Accesso */
  openCredentialDialog() {
    const dialogRef = this.dialog.open(MatModalCredentialsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* Modal Delete Account */
  openDeleteDialog() {
    const dialogRef = this.dialog.open(MatModalDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getUserInfo(id: number | undefined) {
    // prendi informazioni dell'utente, leggendo il responseId --> id dei dati nel localStorage (IAuthToken)    
    return this.authService.getUserInfo(id).subscribe(
      (resp) => {
        this.error = undefined;
        this.user = resp;
      },
      (err) => {
        // questo problema avviene quando restarto il server e riloggo senza aver riavviato il browser
        console.log("Il server e' ripartito, per eseguire il get faccio il reload della pagina");
        location.reload();
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
