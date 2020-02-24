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
      <app-resource-thumb-rating
        [rating]="+data?.review"
        [starCount]="+5"
      ></app-resource-thumb-rating>
      <span class="count-reviews">{{ data?.count_reviews }} Reviews</span>
    </div>
  `,
  styles: [
    `
      .header {
        background-size: cover;
        background-position: center;
        width: 200px;
        height: 200px;
        position: relative;
      }

      span.count-reviews {
        position: absolute;
        bottom: 2%;
        right: 0;
        font-size: 0.65rem;
        padding-right: 0.4rem;
        padding-left: 0.4rem;
        border-radius: 20px;
        background-color: white;
        border: 2px solid var(--primary-color);
        height: 21px;
        width: 74px;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `
  ]
})
export class ResourceThumbHeaderComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
