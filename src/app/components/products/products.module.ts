import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.page';
import { VideogamesComponent } from './sub-pages/videogames.page';
import { AudiobooksComponent } from './sub-pages/audiobooks.page';
import { MatCardVideogameComponent } from './sub-components/mat-card-videogame.component';
import { MusicComponent } from './sub-pages/music.page';

/* ---------- Material ---------- */
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ProductsComponent,
    VideogamesComponent,
    MusicComponent,
    AudiobooksComponent,
    MatCardVideogameComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ProductsModule { }
