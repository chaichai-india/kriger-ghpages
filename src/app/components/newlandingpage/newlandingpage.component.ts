import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-newlandingpage",
  templateUrl: "./newlandingpage.component.html",
  styleUrls: ["./newlandingpage.component.css"]
})
export class NewlandingpageComponent implements OnInit {
  featured = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor() {}

  ngOnInit() {}
}
