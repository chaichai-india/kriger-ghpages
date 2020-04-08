import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NotificationRoutingModule } from "./notification-routing.module";
import { NotificationListComponent } from "./notification-list/notification-list.component";
import { NotificationComponent } from "./notification/notification.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatProgressSpinnerModule } from "@angular/material";
import { MomentModule } from "ngx-moment";

@NgModule({
  declarations: [NotificationListComponent, NotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MomentModule,
  ],
})
export class NotificationModule {}
