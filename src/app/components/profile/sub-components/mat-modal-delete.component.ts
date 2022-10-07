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

  authData: any = localStorage.getItem('isAuthenticated'); // oggetto JSON
  parsedData = JSON.parse(this.authData);                  // oggetto JSON parsed
  responseId: number = this.parsedData.id;                 // id preso dal dal JSON parsed

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.deleteAccount();
    window.alert("Account has been deleted successfully. You will be re-directed to the Login page");
    this.authService.logout();
  }

  deleteAccount() {
    return this.authService.deleteAccount(this.responseId).subscribe(
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
