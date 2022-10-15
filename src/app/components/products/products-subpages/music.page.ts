import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MatModalMusicComponent } from '../mat-modal-music/mat-modal-music.component';

@Component({
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss']
})
export class MusicComponent implements OnInit {

  getRole: string | undefined = this.authService.getRole()?.toString();

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  openMusicDialog() {
    const dialogRef = this.dialog.open(MatModalMusicComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
