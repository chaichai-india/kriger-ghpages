import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { ContactComponent } from './contact/contact.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';

@NgModule({
  declarations: [ContactComponent, ScrollTopComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [ContactComponent, ScrollTopComponent, CommonModule]
})
export class SharedModule {}
