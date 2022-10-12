import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.page';
import { VideogamesComponent } from './sub-pages/videogames.page';
import { BooksComponent } from './sub-pages/books.page';
import { MatCardVideogameComponent } from './sub-components/mat-card-videogame.component';
import { MusicComponent } from './sub-pages/music.page';

/* ---------- Material ---------- */
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatModalVideogameComponent } from './sub-components/mat-modal-videogame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatModalMusicComponent } from './sub-components/mat-modal-music.component';
import { MatModalBookComponent } from './sub-components/mat-modal-book.component';
import { MatCardMusicComponent } from './sub-components/mat-card-music.component';
import { MatCardBookComponent } from './sub-components/mat-card-book.component';

@NgModule({
  declarations: [
    ProductsComponent,
    VideogamesComponent,
    MusicComponent,
    BooksComponent,
    MatCardVideogameComponent,
    MatModalVideogameComponent,
    MatModalMusicComponent,
    MatModalBookComponent,
    MatCardMusicComponent,
    MatCardBookComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatDialogModule
  ]
})
export class ProductsModule { }
