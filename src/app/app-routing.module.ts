import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'posts', loadChildren: './post/post.module#PostModule' },
  {
    path: 'profiles',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
