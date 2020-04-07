import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [NotificationListComponent, NotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule { }
