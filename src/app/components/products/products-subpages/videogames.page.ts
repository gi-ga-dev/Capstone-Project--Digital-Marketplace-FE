import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MatModalVideogameComponent } from '../mat-modal-videogame/mat-modal-videogame.component';

@Component({
  templateUrl: './videogames.page.html',
  styleUrls: ['./videogames.page.scss']
})
export class VideogamesComponent implements OnInit {

  getRole: string | undefined = this.authService.getRole()?.toString();

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  openVideogameDialog() {
    const dialogRef = this.dialog.open(MatModalVideogameComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
