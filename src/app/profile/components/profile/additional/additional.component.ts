import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-additional",
  templateUrl: "./additional.component.html",
  styles: []
})
export class AdditionalComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
