import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { AuthGuard } from "../services/authentication/auth.guard";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";

import { PostListComponent } from "./components/post-list/post-list.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { PostResolver } from "./post-resolver.service";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const routes: Routes = [
  {
    path: "",
    component: PostListComponent,
    // ...canActivate(redirectUnauthorizedToLogin()),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: ":id",
    component: PostDetailComponent,
    resolve: { data: PostResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
