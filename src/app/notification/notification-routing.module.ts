import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotificationListComponent } from "./notification-list/notification-list.component";
import { AuthGuard } from "../services/authentication/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: NotificationListComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
