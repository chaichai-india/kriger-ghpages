import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-resource-thumb-header",
  template: `
    <div
      class="header"
      [ngStyle]="{
        'background-image':
          'url(' + data?.thumb + '), url(../../../../assets/images/user.svg)'
      }"
    >
      <!-- <app-resource-thumb-rating
        [rating]="+data?.review"
        [starCount]="+5"
      ></app-resource-thumb-rating>
      <span class="count-reviews">{{ data?.count_reviews }} Reviews</span> -->
    </div>
  `,
  styles: [
    `
      .header {
        background-size: cover;
        background-position: center;
        width: 150px;
        height: 150px;
        position: relative;
      }
    `
  ]
})
export class ResourceThumbHeaderComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
