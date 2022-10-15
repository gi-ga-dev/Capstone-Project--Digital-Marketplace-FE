import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-delete',
  templateUrl: './mat-modal-delete.component.html',
  styleUrls: ['./mat-modal-delete.component.scss']
})
export class MatModalDeleteComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  hide: boolean = true;
  show: boolean = false;
  getId: number | undefined = this.authService.getId();

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.deleteAccount();
    window.alert("Account has been deleted successfully. You will be re-directed to the Login page");
    this.authService.logout();
  }

  deleteAccount() {
    return this.authService.deleteAccount(this.getId).subscribe(
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
