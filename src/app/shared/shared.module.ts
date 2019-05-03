import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ContactComponent } from './contact/contact.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';

@NgModule({
  declarations: [ContactComponent, ScrollTopComponent],
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [
    ContactComponent,
    ScrollTopComponent,
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {}
