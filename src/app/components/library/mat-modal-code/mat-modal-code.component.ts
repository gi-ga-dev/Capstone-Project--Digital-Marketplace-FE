import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-mat-modal-code',
  templateUrl: './mat-modal-code.component.html',
  styleUrls: ['./mat-modal-code.component.scss']
})
export class MatModalCodeComponent implements OnInit {

  error = undefined;
  product!: any;
  showDownloadCode: boolean = false;

  constructor(
    private authService: AuthService,
    private prodService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | undefined }) { }

  ngOnInit(): void {
    // lancio saveCode e genero token play all'apertura del modal
    this.prodService.saveCode(this.data.id);

    this.getProductById(this.data.id);
    setTimeout(() => {
      this.showDownloadCode = true;
    }, 300);
  }

  saveCode(id: number | undefined) {
    return this.prodService.saveCode(id).subscribe(
      (resp) => {
        this.error = undefined;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  getProductById(id: number | undefined) {
    // passo id dalla card al modal, al ngOnInit faccio il get del prod con l'id, 
    // tramite obj product (resp) passo product.id all'html
    return this.prodService.getProductById(id).subscribe(
      (resp) => {
        this.error = undefined;
        this.product = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
