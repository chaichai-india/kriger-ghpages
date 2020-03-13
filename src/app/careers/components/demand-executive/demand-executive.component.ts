import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-demand-executive",
  templateUrl: "./demand-executive.component.html",
  styleUrls: ["./demand-executive.component.css"]
})
export class DemandExecutiveComponent implements OnInit {
  roleData = {
    role: "Demand Executive",
    categories: ["New Delhi", "Demand", "Full-Time"]
  };
  constructor() {}

  ngOnInit() {}
}
