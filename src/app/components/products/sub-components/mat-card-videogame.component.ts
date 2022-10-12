import { Component, OnInit } from '@angular/core';
import { IProdVideogame } from 'src/app/interfaces/iprod-videogame';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mat-card-videogame',
  templateUrl: './mat-card-videogame.component.html',
  styleUrls: ['./mat-card-videogame.component.scss']
})
export class MatCardVideogameComponent implements OnInit {

  error = undefined;
  isDiscounted!: boolean;
  videogames: IProdVideogame[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void { this.getAllVideogames(); }

  getAllVideogames() {
    return this.authService.getAllVideogames().subscribe(
      (resp) => {
        this.error = undefined;
        this.videogames = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
