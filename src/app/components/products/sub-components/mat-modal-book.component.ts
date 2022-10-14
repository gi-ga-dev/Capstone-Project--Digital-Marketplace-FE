import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-book',
  templateUrl: './mat-modal-book.component.html',
  styleUrls: ['./mat-modal-book.component.scss']
})
export class MatModalBookComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() { this.saveBook(); }

  saveBook() {
    this.authService.saveBook(this.form.value).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.reloadRoute();
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
