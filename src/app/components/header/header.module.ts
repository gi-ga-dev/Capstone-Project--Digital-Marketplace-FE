import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatNavbarComponent } from './sub-components/mat-navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

/* ---- Material Modules ---- */
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatModalSubscriptionComponent } from './sub-components/mat-modal-subscription.component';
import { MatModalAddbalanceComponent } from './sub-components/mat-modal-addbalance.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    HeaderComponent,
    MatNavbarComponent,
    MatModalSubscriptionComponent,
    MatModalAddbalanceComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatDividerModule
  ],
  exports: [
    HeaderComponent,
    MatNavbarComponent
  ]
})
export class HeaderModule { }
