import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternshipsComponent } from './components/internships/internships.component';
import { MediacoverageComponent } from './components/mediacoverage/mediacoverage.component';
import { CareersComponent } from './components/careers/careers.component';
import { TncComponent } from './components/tnc/tnc.component';
import { OurteamComponent } from './components/ourteam/ourteam.component';
import { InternshipTncComponent } from './components/internship-tnc/internship-tnc.component';

const routes: Routes = [
  { path: 'internships', component: InternshipsComponent },
  { path: 'media-coverage', component: MediacoverageComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'term-conditions', component: TncComponent },
  { path: 'our-team', component: OurteamComponent },
  { path: 'internship-tnc', component: InternshipTncComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
