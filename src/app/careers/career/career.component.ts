import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import {
  websiteDeveloper,
  contentModerator,
  demandExecutive,
  supplyExecutive,
  androidDeveloper
} from "./career-data";

@Component({
  selector: "app-career",
  templateUrl: "./career.component.html",
  styleUrls: ["./career.component.css"]
})
export class CareerComponent implements OnInit {
  data;
  career_map = {
    "website-developer": websiteDeveloper,
    "android-developer": androidDeveloper,
    "content-moderator": contentModerator,
    "business-development-executive": supplyExecutive,
    "demand-executive": demandExecutive
  };
  constructor(public route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const career = this.route.snapshot.params["career"];
    this.data = this.career_map[career];
    if (!this.data) {
      this.router.navigateByUrl("/404");
    }
  }
}
