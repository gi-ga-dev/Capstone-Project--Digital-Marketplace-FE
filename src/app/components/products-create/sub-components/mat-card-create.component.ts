import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mat-card-create',
  templateUrl: './mat-card-create.component.html',
  styleUrls: ['./mat-card-create.component.scss']
})
export class MatCardCreateComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() { this.createVideogame(); }

  createVideogame() {
    this.authService.createVideogame(this.form.value).subscribe(
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
