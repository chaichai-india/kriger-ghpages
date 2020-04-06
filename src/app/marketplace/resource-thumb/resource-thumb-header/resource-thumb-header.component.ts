import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-resource-thumb-header",
  template: `
    <a
      [routerLink]="['/marketplace', data?._id]"
      href="/marketplace/{{ data?._id }}"
      class="header"
      [ngStyle]="{
        'background-image':
          'url(' +
          data?.thumb +
          '), url(../../../../assets/images/resource_default.jpeg)'
      }"
    >
      <div class="rating">
        <app-resource-thumb-rating
          [rating]="data?.review"
        ></app-resource-thumb-rating>
      </div>
      <!-- <app-resource-thumb-rating
        [rating]="+data?.review"
        [starCount]="+5"
      ></app-resource-thumb-rating>
      <span class="count-reviews">{{ data?.count_reviews }} Reviews</span> -->
    </a>
  `,
  styles: [
    `
      .header {
        background-size: cover;
        background-position: center;
        width: 150px;
        height: 150px;
        position: relative;
        border-radius: 6px 0 0 6px;
        display: block;
      }

      .header::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        border-radius: border-radius: 6px 0 0 6px;
        background: linear-gradient(
          305.27deg,
          rgba(0, 0, 0, 0.7) 0.19%,
          rgba(0, 0, 0, 0) 54.37%
        );
      }
      .rating {
        width: 40px;
        height: 20px;
        position: absolute;
        bottom: 5px;
        right: 5px;
      }
    `,
  ],
})
export class ResourceThumbHeaderComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {
    // console.log("header", this.data);
  }
}
