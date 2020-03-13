import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-content-writer",
  templateUrl: "./content-writer.component.html",
  styleUrls: ["./content-writer.component.css"]
})
export class ContentWriterComponent implements OnInit {
  roleData = {
    role: "Content Moderator",
    categories: ["New Delhi", "Content", "Full-Time"]
  };
  constructor() {}

  ngOnInit() {}
}
