import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CareersComponent } from "./components/careers/careers.component";
import { CareerComponent } from "./career/career.component";

const routes: Routes = [
  { path: "", component: CareersComponent },
  { path: ":career", component: CareerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareersRoutingModule {}
