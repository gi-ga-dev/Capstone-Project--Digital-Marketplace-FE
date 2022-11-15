import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MatModalSignupAdminComponent } from '../../auth/mat-modal-signup-admin/mat-modal-signup-admin.component';
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
    this.dialog.open(MatModalSignupAdminComponent, { panelClass: 'signupadmin-dialog-cont' });
  }

  openVideogameDialog() {
    this.dialog.open(MatModalVideogameComponent, { panelClass: 'create-vg-dialog-cont' });
  }

  openMusicDialog() {
    this.dialog.open(MatModalMusicComponent, { panelClass: 'create-msc-dialog-cont' });
  }

  openBookDialog() {
    this.dialog.open(MatModalBookComponent, { panelClass: 'create-book-dialog-cont' });
  }

}
