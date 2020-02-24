import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MarketplaceRoutingModule } from "./marketplace-routing.module";
import { ResourceListComponent } from "./resource-list/resource-list.component";
import { ResourceThumbComponent } from "./resource-thumb/resource-thumb.component";
import { ResourceExtendedComponent } from "./resource-extended/resource-extended.component";
import { MatToolbarModule, MatProgressSpinnerModule } from "@angular/material";
import { ResourceThumbHeaderComponent } from './resource-thumb/resource-thumb-header/resource-thumb-header.component';

@NgModule({
  declarations: [
    ResourceListComponent,
    ResourceThumbComponent,
    ResourceExtendedComponent,
    ResourceThumbHeaderComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ]
})
export class MarketplaceModule {}
