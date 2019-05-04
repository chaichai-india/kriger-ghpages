import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternshipsComponent } from './components/internships/internships.component';
import { MediacoverageComponent } from './components/mediacoverage/mediacoverage.component';
import { CareersComponent } from './components/careers/careers.component';
import { TncComponent } from './components/tnc/tnc.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'internships' },
  { path: 'internships', component: InternshipsComponent },
  { path: 'media-coverage', component: MediacoverageComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'term-conditions', component: TncComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
