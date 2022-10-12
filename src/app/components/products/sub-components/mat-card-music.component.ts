import { Component, OnInit } from '@angular/core';
import { IProdMusic } from 'src/app/interfaces/iprod-music';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-card-music',
  templateUrl: './mat-card-music.component.html',
  styleUrls: ['./mat-card-music.component.scss']
})
export class MatCardMusicComponent implements OnInit {

  error = undefined;
  isDiscounted!: boolean;
  music: IProdMusic[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.getAllMusic(); }

  getAllMusic() {
    return this.authService.getAllMusic().subscribe(
      (resp) => {
        this.error = undefined;
        this.music = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
