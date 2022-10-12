import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-videogame',
  templateUrl: './mat-modal-videogame.component.html',
  styleUrls: ['./mat-modal-videogame.component.scss']
})
export class MatModalVideogameComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() { this.createVideogame(); }

  createVideogame() {
    this.authService.saveVideogame(this.form.value).subscribe(
      (resp) => {
        this.error = undefined;
        console.log(resp);
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
