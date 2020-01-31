import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";

import { vineetData } from "./data";

const routes: Routes = [
  {
    path: "",
    // component: ProfileComponent,
    children: [
      { path: "", pathMatch: "prefix", redirectTo: "vineetsharma" },
      {
        path: "vineetsharma",
        component: ProfileComponent,
        data: { ...vineetData }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducatorRoutingModule {}
