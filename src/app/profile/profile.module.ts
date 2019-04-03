import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSortComponent } from './components/profile-sort/profile-sort.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { DebounceClickDirective } from '../directives/debounce-click.directive';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSortComponent,
    ProfileListComponent,
    DebounceClickDirective
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ]
})
export class ProfileModule {}
