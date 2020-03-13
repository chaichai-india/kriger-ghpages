import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-android-developer",
  templateUrl: "./android-developer.component.html",
  styleUrls: ["./android-developer.component.css"]
})
export class AndroidDeveloperComponent implements OnInit {
  roleData = {
    role: "Android Developer",
    categories: ["New Delhi", "Tech", "Full-Time"]
  };
  constructor() {}

  ngOnInit() {}
}
