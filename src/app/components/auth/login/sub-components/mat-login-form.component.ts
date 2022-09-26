import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-login-form',
  templateUrl: './mat-login-form.component.html',
  styleUrls: ['./mat-login-form.component.scss']
})
export class LoginMatCardComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  hide = true;
  show = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.show = true;
    this.authService.login(this.form.value).subscribe(
      resp => {
        this.error = undefined;
        this.router.navigate(['home']);
      },
      err => {
        this.error = err.error;
      }
    )
  }

}
