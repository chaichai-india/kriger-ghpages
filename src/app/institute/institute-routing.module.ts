import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./components/profile/profile.component";
import { eduwaveData } from "./data";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", pathMatch: "prefix", redirectTo: "eduwave_classes" },
      {
        path: "eduwave_classes",
        component: ProfileComponent,
        data: { ...eduwaveData }
      }
      // {
      //   path: "praveenverma",
      //   component: ProfileComponent,
      //   data: { ...praveenData }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteRoutingModule {}
