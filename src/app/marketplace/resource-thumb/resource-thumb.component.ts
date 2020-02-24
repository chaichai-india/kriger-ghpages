import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-resource-thumb",
  templateUrl: "./resource-thumb.component.html",
  styleUrls: ["./resource-thumb.component.css"]
})
export class ResourceThumbComponent implements OnInit {
  @Input() resource;
  constructor() {}

  ngOnInit() {}
}
