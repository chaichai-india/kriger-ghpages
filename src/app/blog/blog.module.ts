import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BlogRoutingModule } from "./blog-routing.module";

import { InternshipsComponent } from "./components/internships/internships.component";
import { PerformersComponent } from "./components/internships/performers/performers.component";
import { InternsComponent } from "./components/internships/interns/interns.component";
import { MediacoverageComponent } from "./components/mediacoverage/mediacoverage.component";
// import { CareersComponent } from "./components/careers/careers.component";
import { TncComponent } from "./components/tnc/tnc.component";
import { OurteamComponent } from "./components/ourteam/ourteam.component";
import { TeamMemberComponent } from "./components/ourteam/team-member/team-member.component";
import { NewsletterFormComponent } from "./components/internships/newsletter-form/newsletter-form.component";

import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  MatInputModule,
  MatIconModule,
  MatChipsModule,
  MatButtonModule
} from "@angular/material";
import { SharedModule } from "../shared/shared.module";
import { PricingComponent } from "./components/pricing/pricing.component";
import { InternshipTncComponent } from "./components/internship-tnc/internship-tnc.component";
import { CentralComponent } from "./components/central/central.component";
import { VisitusComponent } from "./components/visitus/visitus.component";
import { ContactusComponent } from './components/contactus/contactus.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { RefundcancelComponent } from './components/refundcancel/refundcancel.component';

@NgModule({
  declarations: [
    InternshipsComponent,
    PerformersComponent,
    InternsComponent,
    MediacoverageComponent,
    TncComponent,
    OurteamComponent,
    TeamMemberComponent,
    NewsletterFormComponent,
    PricingComponent,
    InternshipTncComponent,
    CentralComponent,
    VisitusComponent,
    ContactusComponent,
    PrivacypolicyComponent,
    RefundcancelComponent
  ],
  entryComponents: [
    InternshipsComponent,
    PerformersComponent,
    InternsComponent,
    MediacoverageComponent,
    TncComponent,
    OurteamComponent,
    TeamMemberComponent,
    NewsletterFormComponent,
    PricingComponent,
    InternshipTncComponent,
    VisitusComponent,
    ContactusComponent,
    PrivacypolicyComponent,
    RefundcancelComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    SharedModule
  ]
})
export class BlogModule {}
