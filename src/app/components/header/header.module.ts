import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

/* ------------- Components ----------------- */
import { HeaderComponent } from './header.component';
import { MatNavbarComponent } from './mat-toolbar/mat-navbar.component';

/* ------------- Material ----------------- */
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    HeaderComponent,
    MatNavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule
  ],
  exports: [
    HeaderComponent,
    MatNavbarComponent
  ]
})
export class HeaderModule { }
