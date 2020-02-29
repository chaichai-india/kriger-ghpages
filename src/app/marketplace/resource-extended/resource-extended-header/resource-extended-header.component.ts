import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-resource-extended-header",
  template: `
    <div
      class="header"
      [ngStyle]="{
        'background-image':
          'url(' + data?.original + '), url(../../../../assets/images/user.svg)'
      }"
    >
      <div class="share">
        <app-resource-share [data]="shareData"></app-resource-share>
      </div>
    </div>
  `,
  styles: [
    `
      .header {
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 400px;
        position: relative;
      }
      .share {
        position: absolute;
        bottom: 2%;
        right: 2%;
      }
    `
  ]
})
export class ResourceExtendedHeaderComponent implements OnInit {
  @Input() data;
  shareData;
  constructor() {}

  ngOnInit() {
    console.log(this.data, "header");
    this.shareData = { resource_id: this.data.resource_id, extended: true };
  }
}
