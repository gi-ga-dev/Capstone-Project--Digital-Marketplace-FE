import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-mat-modal-delete-prod',
  templateUrl: './mat-modal-delete-prod.component.html',
  styleUrls: ['./mat-modal-delete-prod.component.scss']
})
export class MatModalDeleteProdComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(
    private authService: AuthService,
    private prodService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | undefined }) { }

  ngOnInit(): void { }

  onSubmit() { this.deleteProduct(this.data.id); }

  deleteProduct(productId: number | undefined) {
    return this.prodService.deleteProduct(productId).subscribe(
      (resp) => {
        this.error = undefined;
      },
      (err) => {
        this.authService.openSnackBar(err.error.text, 'primary-snackbar', 3);
        this.authService.reloadRoute();
        this.error = err.error;
        console.log(err.error.text);
      }
    )
  }

}
