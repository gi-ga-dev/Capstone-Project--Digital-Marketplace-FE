import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatCardProfileComponent } from './sub-components/mat-card-profile.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ProfileComponent,
    MatCardProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule
  ]
})
export class ProfileModule { }
