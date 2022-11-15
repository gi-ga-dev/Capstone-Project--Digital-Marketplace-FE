import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-mat-modal-videogame',
  templateUrl: './mat-modal-videogame.component.html',
  styleUrls: ['./mat-modal-videogame.component.scss']
})
export class MatModalVideogameComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private authService: AuthService, private prodService: ProductsService) { }

  ngOnInit(): void { }

  onSubmit() { this.saveVideogame(); }

  saveVideogame() {
    this.prodService.saveVideogame(this.form.value).subscribe(
      (resp) => {
        this.error = undefined;
        this.authService.openSnackBar("Product Creation successfull!", 'primary-snackbar', 3);
      },
      (err) => {
        this.error = err.error.message;
        this.authService.openSnackBar(err.error.message, 'primary-snackbar', 3);
        console.log(err);
      }
    )
  }

}
