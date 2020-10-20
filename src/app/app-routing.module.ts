import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
// import { LandingpageComponent } from "./components/landingpage/landingpage.component";
import { NewlandingpageComponent } from "./components/newlandingpage/newlandingpage.component";
import { CustomPreloadingStrategy } from "./custom-preloading-strategy";

const routes: Routes = [
  { path: "", component: NewlandingpageComponent },
  {
    path: "posts",
    loadChildren: "./post/post.module#PostModule",
    data: { preload: true },
  },
  // {
  //   path: "profiles",
  //   loadChildren: "./profile/profile.module#ProfileModule"
  // },
  {
    path: "in",
    loadChildren: "./profile/profile.module#ProfileModule",
  },
  {
    path: "marketplace",
    loadChildren: "./marketplace/marketplace.module#MarketplaceModule",
  },
  {
    path: "network",
    loadChildren: "./network/network.module#NetworkModule",
  },
  {
    path: "notifications",
    loadChildren: "./notification/notification.module#NotificationModule",
  },

  {
    path: "register",
    loadChildren: "./signup/signup.module#SignupModule",
  },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginModule",
  },
  // { path: 'blog', loadChildren: 'blog/blog.module#BlogModule' },
  { path: "blog/internships", pathMatch: "full", redirectTo: "internships" },
  { path: "interns-database", pathMatch: "full", redirectTo: "internships" },
  { path: "internships", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "media-coverage", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "careers", loadChildren: "./careers/careers.module#CareersModule" },
  { path: "term-conditions", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "about-us", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "internship-tnc", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "visit-us", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "contact-us", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "privacy-policy", loadChildren: "./blog/blog.module#BlogModule" },
  { path: "404", component: PageNotFoundComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
      scrollPositionRestoration: "enabled",
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule {}
