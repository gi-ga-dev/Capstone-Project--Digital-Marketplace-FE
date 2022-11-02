import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-mat-modal-book',
  templateUrl: './mat-modal-book.component.html',
  styleUrls: ['./mat-modal-book.component.scss']
})
export class MatModalBookComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void { }

  onSubmit() { this.saveBook(); }

  saveBook() {
    this.prodService.saveBook(this.form.value).subscribe(
      (resp) => {
        this.error = undefined;
      },
      (err) => {
        this.error = err.error.message;
        console.log(err.error.message);
      }
    )
  }

}
