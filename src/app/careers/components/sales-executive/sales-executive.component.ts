import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sales-executive",
  templateUrl: "./sales-executive.component.html",
  styleUrls: ["./sales-executive.component.css"]
})
export class SalesExecutiveComponent implements OnInit {
  roleData = {
    role: "Business Development Executive",
    categories: ["New Delhi", "Supply", "Full-Time"]
  };
  constructor() {}

  ngOnInit() {}
}
