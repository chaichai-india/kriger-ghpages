import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-resource-thumb-header",
  template: `
    <p>
      resource-thumb-header works!
    </p>
  `,
  styles: []
})
export class ResourceThumbHeaderComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
