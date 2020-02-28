import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ResourceListComponent } from "./resource-list/resource-list.component";
import { ResourceExtendedComponent } from "./resource-extended/resource-extended.component";
import { ResourceResolver } from "./resource-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: ResourceListComponent
  },
  {
    path: ":resource_id",
    component: ResourceExtendedComponent,
    resolve: { data: ResourceResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule {}
