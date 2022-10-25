import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-signup-form',
  templateUrl: './mat-form-signup.component.html',
  styleUrls: ['./mat-form-signup.component.scss']
})
export class SignupMatCardComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  show: boolean = false;
  hasRegistered: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.show = true;
    this.authService.signup(this.form.value).subscribe(
      (resp) => {
        this.error = undefined;
        this.hasRegistered = true;
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }

}
