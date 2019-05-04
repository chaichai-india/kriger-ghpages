import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';

import { InternshipsComponent } from './components/internships/internships.component';
import { PerformersComponent } from './components/internships/performers/performers.component';
import { InternsComponent } from './components/internships/interns/interns.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { MediacoverageComponent } from './components/mediacoverage/mediacoverage.component';
import { CareersComponent } from './components/careers/careers.component';
import { TncComponent } from './components/tnc/tnc.component';

@NgModule({
  declarations: [InternshipsComponent, PerformersComponent, InternsComponent, MediacoverageComponent, CareersComponent, TncComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class BlogModule {}
