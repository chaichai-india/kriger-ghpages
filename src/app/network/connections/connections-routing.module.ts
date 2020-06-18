import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConnectionsListComponent } from "./connections-list/connections-list.component";

const routes: Routes = [{ path: "", component: ConnectionsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionsRoutingModule {}
