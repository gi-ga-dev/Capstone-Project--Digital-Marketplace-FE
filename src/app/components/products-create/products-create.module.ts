import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsCreateRoutingModule } from './products-create-routing.module';
import { ProductsCreateComponent } from './products-create.component';
import { MatTableCreateComponent } from './sub-components/mat-table-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ProductsCreateComponent,
    MatTableCreateComponent
  ],
  imports: [
    CommonModule,
    ProductsCreateRoutingModule,
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
    MatCardModule
  ]
})
export class ProductsCreateModule { }
