import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NetworkHomeComponent } from "./components/network-home/network-home.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: "",
    component: NetworkHomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: "connections",
    loadChildren: "./connections/connections.module#ConnectionsModule",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkRoutingModule {}
