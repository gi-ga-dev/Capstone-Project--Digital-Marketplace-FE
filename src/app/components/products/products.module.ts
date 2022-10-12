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
import { MatModalVideogameComponent } from './sub-components/mat-modal-videogame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProductsComponent,
    VideogamesComponent,
    MusicComponent,
    AudiobooksComponent,
    MatCardVideogameComponent,
    MatModalVideogameComponent
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
