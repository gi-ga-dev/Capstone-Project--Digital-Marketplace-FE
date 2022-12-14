import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* ------------- Components ----------------- */
import { ProductsComponent } from './products.page';
import { VideogamesComponent } from './products-subpages/videogames.page';
import { BooksComponent } from './products-subpages/books.page';
import { MusicComponent } from './products-subpages/music.page';
import { MatCardVideogameComponent } from './mat-card-videogame/mat-card-videogame.component';
import { MatCardMusicComponent } from './mat-card-music/mat-card-music.component';
import { MatCardBookComponent } from './mat-card-book/mat-card-book.component';
import { MatModalVideogameComponent } from './mat-modal-videogame/mat-modal-videogame.component';
import { MatModalMusicComponent } from './mat-modal-music/mat-modal-music.component';
import { MatModalBookComponent } from './mat-modal-book/mat-modal-book.component';
import { MatModalPurchaseComponent } from './mat-modal-purchase/mat-modal-purchase.component';
import { MatModalPurchaseWithbalanceComponent } from './mat-modal-purchase-withbalance/mat-modal-purchase-withbalance.component';
import { MatModalPurchaseWithsubComponent } from './mat-modal-purchase-withsub/mat-modal-purchase-withsub.component';

/* ------------- Material ----------------- */
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatModalDeleteProdComponent } from './mat-modal-delete-prod/mat-modal-delete-prod.component';

@NgModule({
  declarations: [
    ProductsComponent,
    VideogamesComponent,
    MusicComponent,
    BooksComponent,
    MatCardVideogameComponent,
    MatCardMusicComponent,
    MatCardBookComponent,
    MatModalVideogameComponent,
    MatModalMusicComponent,
    MatModalBookComponent,
    MatModalPurchaseComponent,
    MatModalPurchaseWithbalanceComponent,
    MatModalPurchaseWithsubComponent,
    MatModalDeleteProdComponent
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
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class ProductsModule { }
