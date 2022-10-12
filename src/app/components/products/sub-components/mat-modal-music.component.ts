import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-modal-music',
  templateUrl: './mat-modal-music.component.html',
  styleUrls: ['./mat-modal-music.component.scss']
})
export class MatModalMusicComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit() { this.saveMusic(); }

  saveMusic() {
    this.authService.saveMusic(this.form.value).subscribe(
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
