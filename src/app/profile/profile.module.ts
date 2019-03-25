import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { MatSelectModule } from '@angular/material/select';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSortComponent } from './components/profile-sort/profile-sort.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';

@NgModule({
  declarations: [ProfileComponent, ProfileSortComponent, ProfileListComponent],
  imports: [CommonModule, ProfileRoutingModule, MatSelectModule]
})
export class ProfileModule {}
