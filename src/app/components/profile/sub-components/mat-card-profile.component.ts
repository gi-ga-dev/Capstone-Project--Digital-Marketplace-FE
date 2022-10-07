import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUserDtoGetResponse } from 'src/app/interfaces/idto-user-response';
import { AuthService } from 'src/app/services/auth.service';
import { MatModalCredentialComponent } from './mat-modal-credential.component';
import { MatModalDeleteComponent } from './mat-modal-delete.component';
import { MatModalProfileComponent } from './mat-modal-profile.component';

@Component({
  selector: 'app-mat-card-profile',
  templateUrl: './mat-card-profile.component.html',
  styleUrls: ['./mat-card-profile.component.scss']
})
export class MatCardProfileComponent implements OnInit {

  error = undefined;
  users!: IUserDtoGetResponse[];
  user!: IUserDtoGetResponse; // obj contenente username utente

  authData: any = localStorage.getItem('isAuthenticated'); // oggetto JSON
  parsedData = JSON.parse(this.authData);                  // oggetto JSON parsed
  responseId: number = this.parsedData.id;                 // id preso dal dal JSON parsed

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  /* =========== Open Dialogues ============= */

  /* Modal Modifica Informazioni base */
  openProfileDialog() {
    const dialogRef = this.dialog.open(MatModalProfileComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* Modal Modifica Credenziali di Accesso */
  openCredentialDialog() {
    const dialogRef = this.dialog.open(MatModalCredentialComponent);
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

  ngOnInit(): void {
    this.getUserInfo(this.responseId);
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
