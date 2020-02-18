import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";

import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { ProfileComponent } from "./components/profile/profile.component";
import { ProfileSortComponent } from "./components/profile-sort/profile-sort.component";
import { ProfileListComponent } from "./components/profile-list/profile-list.component";
import { DebounceClickDirective } from "../directives/debounce-click.directive";
import { ProfileResolver } from "./profile-resolver.service";
import { HeaderComponent } from './components/profile/header/header.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSortComponent,
    ProfileListComponent,
    DebounceClickDirective,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [ProfileResolver]
})
export class ProfileModule {}
