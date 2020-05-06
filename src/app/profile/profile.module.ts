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
// import { ProfileListComponent } from "./components/profile-list/profile-list.component";
import { ProfileResolver } from "./profile-resolver.service";
import { HeaderComponent } from "./components/profile/header/header.component";
import { IntroComponent } from "./components/profile/intro/intro.component";
import { AboutComponent } from "./components/profile/about/about.component";
import { AdditionalComponent } from "./components/profile/additional/additional.component";
import { ExamsComponent } from "./components/profile/exams/exams.component";
import { SubjectsComponent } from "./components/profile/subjects/subjects.component";
import { CollegeComponent } from "./components/profile/college/college.component";
import { CoachingComponent } from "./components/profile/coaching/coaching.component";
import { AwardComponent } from "./components/profile/award/award.component";
import { CertificationComponent } from "./components/profile/certification/certification.component";
import { InternshipComponent } from "./components/profile/internship/internship.component";
import { PublicationComponent } from "./components/profile/publication/publication.component";
import { SpecialisationComponent } from "./components/profile/specialisation/specialisation.component";
import {
  PresenceComponent,
  PresenceLinkComponent,
} from "./components/profile/presence/presence.component";
import { AddressComponent } from "./components/profile/address/address.component";
import { ConnectComponent } from "./components/profile/connect/connect.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSortComponent,
    // ProfileListComponent,
    HeaderComponent,
    IntroComponent,
    AboutComponent,
    AdditionalComponent,
    ExamsComponent,
    SubjectsComponent,
    CollegeComponent,
    CoachingComponent,
    AwardComponent,
    CertificationComponent,
    InternshipComponent,
    PublicationComponent,
    SpecialisationComponent,
    PresenceComponent,
    AddressComponent,
    PresenceLinkComponent,
    ConnectComponent,
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
    MatIconModule,
    SharedModule,
  ],
  providers: [ProfileResolver],
})
export class ProfileModule {}
