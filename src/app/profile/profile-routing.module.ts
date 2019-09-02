import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileListComponent } from "./components/profile-list/profile-list.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "../services/authentication/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ProfileListComponent
  },
  {
    path: ":username",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
