import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NetworkHomeComponent } from "./components/network-home/network-home.component";

const routes: Routes = [{ path: "", component: NetworkHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkRoutingModule {}
