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
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
} from "@angular/material";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ResourceThumbHeaderComponent } from "./resource-thumb/resource-thumb-header/resource-thumb-header.component";
import { ResourceThumbRatingComponent } from "./resource-thumb/resource-thumb-rating/resource-thumb-rating.component";
import { ResourceThumbBodyComponent } from "./resource-thumb/resource-thumb-body/resource-thumb-body.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import {
  ResourceShareComponent,
  ShareResourceDialogComponent,
} from "./resource-share/resource-share.component";
import { ClipboardModule } from "ngx-clipboard";
import { ResourceResolver } from "./resource-resolver.service";
import { ResourceExtendedHeaderComponent } from "./resource-extended/resource-extended-header/resource-extended-header.component";
import { ResourceExtendedBodyComponent } from "./resource-extended/resource-extended-body/resource-extended-body.component";
import { SidedrawerComponent } from "./sidedrawer/sidedrawer.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ResourceListComponent,
    ResourceThumbComponent,
    ResourceExtendedComponent,
    ResourceThumbHeaderComponent,
    ResourceThumbRatingComponent,
    ResourceThumbBodyComponent,
    ResourceShareComponent,
    ShareResourceDialogComponent,
    ResourceExtendedHeaderComponent,
    ResourceExtendedBodyComponent,
    SidedrawerComponent,
  ],
  entryComponents: [ShareResourceDialogComponent],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatFormFieldModule,
    ClipboardModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    SharedModule,
  ],
  providers: [ResourceResolver],
})
export class MarketplaceModule {}
