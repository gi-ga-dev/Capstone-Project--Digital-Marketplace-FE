import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-mat-modal-sales-event',
  templateUrl: './mat-modal-sales-event.component.html',
  styleUrls: ['./mat-modal-sales-event.component.scss']
})
export class MatModalSalesEventComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(
    private authService: AuthService,
    private prodService: ProductsService) { }

  ngOnInit(): void { }

  onSubmit() { this.createEvent(); }

  createEvent() {
    this.prodService.createEvent(this.form.value).subscribe(
      (resp) => {
        this.error = undefined;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
