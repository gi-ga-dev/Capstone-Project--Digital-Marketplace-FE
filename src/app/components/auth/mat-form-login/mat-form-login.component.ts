import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-mat-login-form',
  templateUrl: './mat-form-login.component.html',
  styleUrls: ['./mat-form-login.component.scss']
})
export class LoginMatCardComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  hide = true;
  show = false;

  isDarkMode: boolean = this.themeService.themeStatus();

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.show = true;
    this.authService.login(this.form.value).subscribe(
      (resp) => {
        this.error = undefined;
        setTimeout(() => {
          console.log("--> User logged in");
          this.router.navigate(['home']);
          this.authService.setCartListForBadgeCount(this.authService.getId()).subscribe();
          this.authService.setSubAndBalance(this.authService.getId()).subscribe();
        }, 400);
      },
      (err) => {
        this.error = err.error;
      }
    )
  }

}
