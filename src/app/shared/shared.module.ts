import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ContactComponent } from "./contact/contact.component";
import { ScrollTopComponent } from "./scroll-top/scroll-top.component";
import { FooterNewComponent } from "./footer-new/footer-new.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ContactComponent, ScrollTopComponent, FooterNewComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    ContactComponent,
    ScrollTopComponent,
    FooterNewComponent,
    CommonModule,
    MatProgressSpinnerModule,
    NgbModule
  ]
})
export class SharedModule {}
