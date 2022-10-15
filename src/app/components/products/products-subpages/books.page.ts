import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MatModalBookComponent } from '../mat-modal-book/mat-modal-book.component';

@Component({
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss']
})
export class BooksComponent implements OnInit {

  getRole: string | undefined = this.authService.getRole()?.toString();

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  openBookDialog() {
    const dialogRef = this.dialog.open(MatModalBookComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
