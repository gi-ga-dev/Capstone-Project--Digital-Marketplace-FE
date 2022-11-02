import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-mat-modal-videogame',
  templateUrl: './mat-modal-videogame.component.html',
  styleUrls: ['./mat-modal-videogame.component.scss']
})
export class MatModalVideogameComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void { }

  onSubmit() { this.saveVideogame(); }

  saveVideogame() {
    this.prodService.saveVideogame(this.form.value).subscribe(
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
