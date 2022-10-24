import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';

/* ------------- Components ----------------- */
import { LibraryComponent } from './library.page';
import { MatCardLibraryComponent } from './mat-card-library/mat-card-library.component';

/* ------------- Material ----------------- */
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    LibraryComponent,
    MatCardLibraryComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class LibraryModule { }
