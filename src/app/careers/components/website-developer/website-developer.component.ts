import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-website-developer",
  templateUrl: "./website-developer.component.html",
  styleUrls: ["./website-developer.component.css"]
})
export class WebsiteDeveloperComponent implements OnInit {
  roleData = {
    role: "Website Developer",
    categories: ["New Delhi", "Tech", "Full-Time"]
  };
  constructor() {}

  ngOnInit() {}
}
