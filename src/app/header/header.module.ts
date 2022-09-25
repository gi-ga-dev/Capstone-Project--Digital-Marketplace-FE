import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarComponent } from './components/mat-toolbar.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from '../app-routing.module';

/* ---- Material Modules ---- */
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    MatToolbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
    MatToolbarComponent
  ]
})
export class HeaderModule { }
