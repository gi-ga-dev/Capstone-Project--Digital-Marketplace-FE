import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

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

  isDarkMode: boolean = this.themeService.themeStatus();
  themeColor!: string;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.show = true;
    this.authService.signup(this.form.value).subscribe(
      (resp) => {
        this.error = undefined;
        this.hasRegistered = true;
        this.authService.openSnackBar("User creation successfull!", 'primary-snackbar', 3);
      },
      (err) => {
        this.error = err.error;
        this.authService.openSnackBar(err.error.message, 'primary-snackbar', 3);
        console.log(err.error);
      }
    )
  }

}
