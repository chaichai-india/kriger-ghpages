import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { ProfileListComponent } from "./components/profile-list/profile-list.component";
import { ProfileComponent } from "./components/profile/profile.component";
// import { AuthGuard } from "../services/authentication/auth.guard";
import { ProfileResolver } from "./profile-resolver.service";

const routes: Routes = [
  {
    path: "",
    // component: ProfileComponent,
    // resolve: { data: ProfileResolver }
    // children: [
    //   {
    //     path: ":username",
    //     component: ProfileComponent
    //   }
    // ]
  },
  {
    path: "learner",
    children: [
      {
        path: ":username",
        component: ProfileComponent,
        resolve: { data: ProfileResolver },
      },
    ],
  },
  {
    path: "educator",
    children: [
      {
        path: ":username",
        component: ProfileComponent,
        resolve: { data: ProfileResolver },
      },
    ],
  },
  {
    path: "institute",
    children: [
      {
        path: ":username",
        component: ProfileComponent,
        resolve: { data: ProfileResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
