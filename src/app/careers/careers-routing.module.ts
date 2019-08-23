import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CareersComponent } from "./components/careers/careers.component";
import { AndroidDeveloperComponent } from "./components/android-developer/android-developer.component";
import { WebsiteDeveloperComponent } from "./components/website-developer/website-developer.component";
import { ContentWriterComponent } from "./components/content-writer/content-writer.component";
import { SalesExecutiveComponent } from "./components/sales-executive/sales-executive.component";

const routes: Routes = [
  { path: "", component: CareersComponent },
  { path: "android-developer", component: AndroidDeveloperComponent },
  { path: "website-developer", component: WebsiteDeveloperComponent },
  { path: "content-writer", component: ContentWriterComponent },
  { path: "sales-executive", component: SalesExecutiveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareersRoutingModule {}
