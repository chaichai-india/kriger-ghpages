import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotificationListComponent } from "./notification-list/notification-list.component";
// import { AuthGuard } from "../services/authentication/auth.guard";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: "",
    component: NotificationListComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
