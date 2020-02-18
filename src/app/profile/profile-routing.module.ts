import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileListComponent } from "./components/profile-list/profile-list.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "../services/authentication/auth.guard";
import { ProfileResolver } from "./profile-resolver.service";

const routes: Routes = [
  {
    path: ":username",
    component: ProfileComponent,
    resolve: { data: ProfileResolver }
    // children: [
    //   {
    //     path: ":username",
    //     component: ProfileComponent
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
