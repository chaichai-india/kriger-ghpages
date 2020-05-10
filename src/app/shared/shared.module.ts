import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

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
import { DebounceClickDirective } from "./directives";

@NgModule({
  declarations: [
    ContactComponent,
    ScrollTopComponent,
    FooterNewComponent,
    DialogComponent,
    UserBadgeComponent,
    DebounceClickDirective,
  ],
  entryComponents: [DialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [
    ContactComponent,
    ScrollTopComponent,
    FooterNewComponent,
    UserBadgeComponent,
    DebounceClickDirective,
    DialogComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
