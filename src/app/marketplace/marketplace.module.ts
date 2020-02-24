import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceThumbComponent } from './resource-thumb/resource-thumb.component';
import { ResourceExtendedComponent } from './resource-extended/resource-extended.component';

@NgModule({
  declarations: [ResourceListComponent, ResourceThumbComponent, ResourceExtendedComponent],
  imports: [
    CommonModule,
    MarketplaceRoutingModule
  ]
})
export class MarketplaceModule { }
