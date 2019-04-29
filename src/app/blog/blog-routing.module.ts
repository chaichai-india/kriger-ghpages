import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternshipsComponent } from './components/internships/internships.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'internships' },
  { path: 'internships', component: InternshipsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
