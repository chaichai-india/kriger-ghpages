import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileListComponent } from './components/profile-list/profile-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profiles' },
  { path: 'profiles', component: ProfileListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
