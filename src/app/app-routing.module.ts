import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { LandingpageComponent } from "./components/landingpage/landingpage.component";
import { NewlandingpageComponent } from "./components/newlandingpage/newlandingpage.component";
import { CustomPreloadingStrategy } from "./custom-preloading-strategy";

const routes: Routes = [
  // { path: "", component: LandingpageComponent },
  { path: "", component: NewlandingpageComponent },
  {
    path: "posts",
    loadChildren: "./post/post.module#PostModule",
    data: { preload: true }
  },
  {
    path: "profiles",
    loadChildren: "./profile/profile.module#ProfileModule"
  },
  {
    path: "india",
    loadChildren: "./profile/profile.module#ProfileModule"
  },
  // {
  //   path: "register",
  //   loadChildren: "./signup/signup.module#SignupModule"
  // },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginModule"
  },
  // { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
  { path: "internships", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "media-coverage", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "careers", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "term-conditions", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "our-team", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "internship-tnc", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "visit-us", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "404", component: PageNotFoundComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      preloadingStrategy: CustomPreloadingStrategy
    })
  ],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule {}
