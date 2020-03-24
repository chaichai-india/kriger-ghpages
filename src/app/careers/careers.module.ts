import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CareersRoutingModule } from "./careers-routing.module";
import { MatButtonModule } from "@angular/material";
import { SharedModule } from "../shared/shared.module";
import { CareersComponent } from "./components/careers/careers.component";
import { CareerRoleComponent } from "./components/career-role/career-role.component";
import { CareerComponent } from "./career/career.component";

@NgModule({
  declarations: [CareersComponent, CareerRoleComponent, CareerComponent],
  imports: [CommonModule, CareersRoutingModule, MatButtonModule, SharedModule]
})
export class CareersModule {}
