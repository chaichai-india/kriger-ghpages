import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NetworkRoutingModule } from "./network-routing.module";
import { NetworkHomeComponent } from "./components/network-home/network-home.component";
import { NetworkDrawerComponent } from "./components/network-drawer/network-drawer.component";
import { NetworkInvitationsComponent } from "./components/network-invitations/network-invitations.component";
import { NetworkSuggestionsComponent } from "./components/network-suggestions/network-suggestions.component";

import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "../shared/shared.module";
import { NetworkInvitationUserComponent } from "./components/network-invitation-user/network-invitation-user.component";
import { NetworkSuggestionUserComponent } from "./components/network-suggestion-user/network-suggestion-user.component";
import { MatButtonModule, MatIconModule } from "@angular/material";

@NgModule({
  declarations: [
    NetworkHomeComponent,
    NetworkDrawerComponent,
    NetworkInvitationsComponent,
    NetworkSuggestionsComponent,
    NetworkInvitationUserComponent,
    NetworkSuggestionUserComponent,
  ],
  imports: [
    CommonModule,
    NetworkRoutingModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ],
})
export class NetworkModule {}
