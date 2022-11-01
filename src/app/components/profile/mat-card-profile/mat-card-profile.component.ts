import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @ViewChild('f') form!: NgForm;
  error = undefined;
  user!: IUserDtoGetResponse;
  getId: number | undefined = this.authService.getId();
  getRole: string | undefined = this.authService.getRole()?.toString();
  showSpinner: boolean = false;
  avatarArray: string[] = [
    "../../../../assets/images/img-avatar-default.png",
    "../../../../assets/images/img-avatar-1.png",
    "../../../../assets/images/img-avatar-2.png",
    "../../../../assets/images/img-avatar-3.png",
    "../../../../assets/images/img-avatar-4.png",
    "../../../../assets/images/img-avatar-5.png",
    "../../../../assets/images/img-avatar-6.png",
    "../../../../assets/images/img-avatar-7.png",
    "../../../../assets/images/img-avatar-8.png",
    "../../../../assets/images/img-avatar-9.png"
  ];

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.getUserInfo(this.getId);
    }, 300);
  }

  /* =========== Open Dialogues ============= */

  openAdminDialog() {
    const dialogRef = this.dialog.open(MatModalAdminComponent, { panelClass: 'admin-dialog-cont' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSubscriptionDialog() {
    // dare una classe al dialog per modificarla nello style principale
    const dialogRef = this.dialog.open(MatModalSubscriptionComponent, { panelClass: 'sub-dialog-cont' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddBalanceDialog() {
    const dialogRef = this.dialog.open(MatModalAddbalanceComponent, { panelClass: 'addbalance-dialog-cont' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* Modal Modifica Informazioni base */
  openProfileDialog() {
    const dialogRef = this.dialog.open(MatModalProfileComponent, { panelClass: 'profileinfo-dialog-cont' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* Modal Modifica Credenziali di Accesso */
  openCredentialDialog() {
    const dialogRef = this.dialog.open(MatModalCredentialsComponent, { panelClass: 'profilecred-dialog-cont' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* Modal Delete Account */
  openDeleteDialog() {
    const dialogRef = this.dialog.open(MatModalDeleteComponent, { panelClass: 'delete-dialog-cont' });
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

  onSubmit() {
    this.updateAvatarViaUrl();
  }

  updateAvatarViaUrl() {
    this.authService.updateAvatarViaUrl(this.form.value, this.getId).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.reloadRoute();
        this.authService.openSnackBar("Avatar changed successfully...", 'primary-snackbar', 3);
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
        //this.authService.openSnackBar(err.message, 'primary-snackbar', 3);
      }
    )
  }

  updateAvatarPreSet(avatar: string) {
    this.authService.updateAvatarPreSet(avatar, this.getId).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.reloadRoute();
        //this.authService.openSnackBar("Avatar changed successfully...", 'primary-snackbar', 3);
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
        //this.authService.openSnackBar(err.message, 'primary-snackbar', 3);
      }
    )
  }


}
