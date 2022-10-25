import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* ------------- Components ----------------- */
import { ProfileComponent } from './profile.component';
import { MatCardProfileComponent } from './mat-card-profile/mat-card-profile.component';
import { MatModalProfileComponent } from './mat-modal-profile/mat-modal-profile.component';
import { MatModalCredentialsComponent } from './mat-modal-credentials/mat-modal-credentials.component';
import { MatModalDeleteComponent } from './mat-modal-delete/mat-modal-delete.component';
import { MatModalSubscriptionComponent } from './mat-modal-subscription/mat-modal-subscription.component';
import { MatModalAddbalanceComponent } from './mat-modal-addbalance/mat-modal-addbalance.component';
import { MatModalAdminComponent } from './mat-modal-admin/mat-modal-admin.component';

/* ------------- Material ----------------- */
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ProfileComponent,
    MatCardProfileComponent,
    MatModalProfileComponent,
    MatModalCredentialsComponent,
    MatModalDeleteComponent,
    MatModalSubscriptionComponent,
    MatModalAddbalanceComponent,
    MatModalAdminComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class ProfileModule { }
