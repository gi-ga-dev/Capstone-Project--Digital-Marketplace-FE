import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-signup-admin',
  templateUrl: './mat-modal-signup-admin.component.html',
  styleUrls: ['./mat-modal-signup-admin.component.scss']
})
export class MatModalSignupAdminComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  show: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.show = true;
    this.authService.createAdmin(this.form.value).subscribe(
      (resp) => {
        this.error = undefined;
        window.alert("Admin creation successfull!");
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }

}
