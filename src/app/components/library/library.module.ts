import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* ------------- Components ----------------- */
import { LibraryComponent } from './library.page';
import { MatTableLibraryComponent } from './mat-table-library/mat-table-library.component';

/* ------------- Material ----------------- */
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LibraryComponent,
    MatTableLibraryComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSortModule,
    MatSnackBarModule
  ]
})
export class LibraryModule { }
