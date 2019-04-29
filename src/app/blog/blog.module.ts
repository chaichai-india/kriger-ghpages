import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';

import { InternshipsComponent } from './components/internships/internships.component';
import { PerformersComponent } from './components/internships/performers/performers.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [InternshipsComponent, PerformersComponent],
  imports: [CommonModule, BlogRoutingModule, MatCardModule]
})
export class BlogModule {}
