import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ]
})
export class ProfileModule {}
