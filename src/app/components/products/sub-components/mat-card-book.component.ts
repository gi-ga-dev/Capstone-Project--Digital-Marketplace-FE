import { Component, OnInit } from '@angular/core';
import { IProdBook } from 'src/app/interfaces/iprod-book';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-card-book',
  templateUrl: './mat-card-book.component.html',
  styleUrls: ['./mat-card-book.component.scss']
})
export class MatCardBookComponent implements OnInit {

  error = undefined;
  isDiscounted!: boolean;
  books: IProdBook[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.getAllBooks(); }

  getAllBooks() {
    return this.authService.getAllBooks().subscribe(
      (resp) => {
        this.error = undefined;
        this.books = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
