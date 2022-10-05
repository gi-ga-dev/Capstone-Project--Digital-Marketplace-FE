import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.page';
import { MatProductsTableComponent } from './sub-components/mat-products-table.component';

/* ---------- Material ---------- */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { VideogamesComponent } from './sub-pages/videogames.page';
import { MusicComponent } from './sub-pages/music.page';
import { AudiobooksComponent } from './sub-pages/audiobooks.page';
import { MatVideogameTreeComponent } from './sub-components/mat-videogame-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardVideogameComponent } from './sub-components/mat-card-videogame.component';

@NgModule({
  declarations: [
    ProductsComponent,
    MatProductsTableComponent,
    VideogamesComponent,
    MusicComponent,
    AudiobooksComponent,
    MatVideogameTreeComponent,
    MatCardVideogameComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSortModule,
    MatCardModule,
    MatTreeModule
  ]
})
export class ProductsModule { }
