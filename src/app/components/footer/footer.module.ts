import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

/* ------------- Components ----------------- */
import { FooterComponent } from './footer.component';

/* ------------- Material ----------------- */
import { MatFooterComponent } from './mat-toolbar/mat-footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FooterComponent,
    MatFooterComponent
  ],
  imports: [
    CommonModule,
    /* inserire AppRoutingModule solo se si utilizza componente in tutte le pagine */
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    FooterComponent,
    MatFooterComponent
  ]
})
export class FooterModule { }
