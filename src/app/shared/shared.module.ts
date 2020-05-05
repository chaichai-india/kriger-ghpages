import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from "@angular/material/chips";
// import { MatListModule } from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { ContactComponent } from "./contact/contact.component";
import { ScrollTopComponent } from "./scroll-top/scroll-top.component";
import { FooterNewComponent } from "./footer-new/footer-new.component";
import { RouterModule } from "@angular/router";
import { DialogComponent } from "./dialog/dialog.component";
import { UserBadgeComponent } from "./user-badge/user-badge.component";

@NgModule({
  declarations: [
    ContactComponent,
    ScrollTopComponent,
    FooterNewComponent,
    DialogComponent,
    UserBadgeComponent,
  ],
  entryComponents: [DialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    NgbModule,
    RouterModule,
  ],
  exports: [
    ContactComponent,
    ScrollTopComponent,
    FooterNewComponent,
    UserBadgeComponent,
    DialogComponent,
    CommonModule,
    MatProgressSpinnerModule,
    NgbModule,
  ],
})
export class SharedModule {}
