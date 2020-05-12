import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./components/signup/signup.component";
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
} from "@angular/fire/auth-guard";

const redirectLoggedInToPosts = () => redirectLoggedInTo(["posts"]);

const routes: Routes = [
  {
    path: "",
    component: SignupComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToPosts },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
