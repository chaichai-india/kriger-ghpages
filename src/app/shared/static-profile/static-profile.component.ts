import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-static-profile",
  templateUrl: "./static-profile.component.html",
  styleUrls: ["./static-profile.component.css"]
})
export class StaticProfileComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
