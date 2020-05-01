import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
} from "@angular/fire/auth-guard";
// import { LoginGuard } from "../services/authentication/login.guard";

const redirectLoggedInToPosts = () => redirectLoggedInTo(["posts"]);

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToPosts },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
