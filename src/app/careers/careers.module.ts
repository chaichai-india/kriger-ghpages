import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareersRoutingModule } from './careers-routing.module';
import { MatButtonModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { CareersComponent } from './components/careers/careers.component';
import { AndroidDeveloperComponent } from './components/android-developer/android-developer.component';
import { WebsiteDeveloperComponent } from './components/website-developer/website-developer.component';
import { ContentWriterComponent } from './components/content-writer/content-writer.component';
import { SalesExecutiveComponent } from './components/sales-executive/sales-executive.component';
import { CareerRoleComponent } from './components/career-role/career-role.component';
import { DemandExecutiveComponent } from './components/demand-executive/demand-executive.component';

@NgModule({
  declarations: [CareersComponent, AndroidDeveloperComponent, WebsiteDeveloperComponent, ContentWriterComponent, SalesExecutiveComponent, CareerRoleComponent, DemandExecutiveComponent],
  imports: [
    CommonModule,
    CareersRoutingModule,
    MatButtonModule,
    SharedModule
  ]
})
export class CareersModule { }
