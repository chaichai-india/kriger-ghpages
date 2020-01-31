import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EducatorRoutingModule } from "./educator-routing.module";
import { ProfileComponent } from "./components/profile/profile.component";

import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, EducatorRoutingModule, SharedModule]
})
export class EducatorModule {}
