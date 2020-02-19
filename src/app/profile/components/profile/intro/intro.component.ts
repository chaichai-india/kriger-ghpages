import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.css", "../profile.component.css"]
})
export class IntroComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
