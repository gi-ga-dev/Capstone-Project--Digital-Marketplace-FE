import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* ------------- Components ----------------- */
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { LoginMatCardComponent } from './login/mat-form-login/mat-form-login.component';
import { SignupMatCardComponent } from './signup/mat-form-signup/mat-form-signup.component';
import { MatModalSignupAdminComponent } from './signup/mat-modal-signup-admin/mat-modal-signup-admin.component';

/* ------------- Material ----------------- */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LoginPage,
    SignupPage,
    LoginMatCardComponent,
    SignupMatCardComponent,
    MatModalSignupAdminComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class AuthModule { }
