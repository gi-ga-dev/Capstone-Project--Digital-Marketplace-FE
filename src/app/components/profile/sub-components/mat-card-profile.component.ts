import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUserResponse } from 'src/app/interfaces/iuser-response';
import { AuthService } from 'src/app/services/auth.service';
import { MatModalProfileComponent } from './mat-modal-profile.component';

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

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(MatModalProfileComponent);
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
        this.error = err.error;
        console.log(err.error);
      }
    )
  }


}
