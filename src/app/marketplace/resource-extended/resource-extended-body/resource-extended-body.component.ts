import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-resource-extended-body",
  templateUrl: "./resource-extended-body.component.html",
  styleUrls: ["./resource-extended-body.component.css"]
})
export class ResourceExtendedBodyComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
