import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-mat-modal-music',
  templateUrl: './mat-modal-music.component.html',
  styleUrls: ['./mat-modal-music.component.scss']
})
export class MatModalMusicComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void { }

  onSubmit() { this.saveMusic(); }

  saveMusic() {
    this.prodService.saveMusic(this.form.value).subscribe(
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
