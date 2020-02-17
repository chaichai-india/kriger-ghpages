import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";

import { vineetData, praveenData } from "./data";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", pathMatch: "prefix", redirectTo: "vineetasharma" },
      {
        path: "vineetasharma",
        component: ProfileComponent,
        data: { ...vineetData }
      },
      {
        path: "praveenverma",
        component: ProfileComponent,
        data: { ...praveenData }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducatorRoutingModule {}
