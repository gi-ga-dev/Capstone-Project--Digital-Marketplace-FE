import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MatModalSignupAdminComponent } from '../../auth/signup/mat-modal-signup-admin/mat-modal-signup-admin.component';
import { MatModalBookComponent } from '../../products/mat-modal-book/mat-modal-book.component';
import { MatModalMusicComponent } from '../../products/mat-modal-music/mat-modal-music.component';
import { MatModalVideogameComponent } from '../../products/mat-modal-videogame/mat-modal-videogame.component';

@Component({
  selector: 'app-mat-modal-admin',
  templateUrl: './mat-modal-admin.component.html',
  styleUrls: ['./mat-modal-admin.component.scss']
})
export class MatModalAdminComponent implements OnInit {

  getRole: string | undefined = this.authService.getRole()?.toString();

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  openSignupAdminDialog() {
    const dialogRef = this.dialog.open(MatModalSignupAdminComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openVideogameDialog() {
    const dialogRef = this.dialog.open(MatModalVideogameComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openMusicDialog() {
    const dialogRef = this.dialog.open(MatModalMusicComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openBookDialog() {
    const dialogRef = this.dialog.open(MatModalBookComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
