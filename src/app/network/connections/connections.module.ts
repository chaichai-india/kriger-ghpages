import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConnectionsRoutingModule } from "./connections-routing.module";
import { ConnectionsListComponent } from "./connections-list/connections-list.component";
import { ConnectionUserComponent } from "./connection-user/connection-user.component";
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "../../shared/shared.module";
import { MatButtonModule } from "@angular/material";

@NgModule({
  declarations: [ConnectionsListComponent, ConnectionUserComponent],
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
  ],
})
export class ConnectionsModule {}
