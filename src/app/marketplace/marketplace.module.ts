import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MarketplaceRoutingModule } from "./marketplace-routing.module";
import { ResourceListComponent } from "./resource-list/resource-list.component";
import { ResourceThumbComponent } from "./resource-thumb/resource-thumb.component";
import { ResourceExtendedComponent } from "./resource-extended/resource-extended.component";
import {
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule
} from "@angular/material";
import { ResourceThumbHeaderComponent } from "./resource-thumb/resource-thumb-header/resource-thumb-header.component";
import { ResourceThumbRatingComponent } from "./resource-thumb/resource-thumb-rating/resource-thumb-rating.component";
import { ResourceThumbBodyComponent } from "./resource-thumb/resource-thumb-body/resource-thumb-body.component";

@NgModule({
  declarations: [
    ResourceListComponent,
    ResourceThumbComponent,
    ResourceExtendedComponent,
    ResourceThumbHeaderComponent,
    ResourceThumbRatingComponent,
    ResourceThumbBodyComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MarketplaceModule {}
