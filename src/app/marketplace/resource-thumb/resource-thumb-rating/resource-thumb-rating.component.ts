import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-resource-thumb-rating",
  template: `
    <div class="star__container">
      <!-- <span *ngFor="let ratingId of ratingArr; index as i">
        <mat-icon>
          {{ showIcon(i) }}
        </mat-icon>
      </span> -->
      {{ rating }}
    </div>
  `,
  styles: [
    `
      /* :host {
        position: absolute;
        bottom: 2%;
      } */

      .star__container {
        /* background: white;
        border-radius: 20px;
        border: 2px solid var(--primary-color);
        height: 21px; */
        background-color: #09e009;
        max-width: 40px;
        height: 20px;
        padding: 0 5px;
        text-align: center;
        font-size: 0.9rem;
        color: white;
        text-shadow: 1px 1px 2px #0000004f;
      }

      /* span {
        height: 16px;
        line-height: 12px;
      } */

      /* span .mat-icon {
        font-size: 16px;
        display: inline-grid;
        justify-content: center;
      } */
    `
  ]
})
export class ResourceThumbRatingComponent implements OnInit {
  @Input("rating") rating: number;
  // @Input("starCount") private starCount: number;

  constructor() {}
  // ratingArr = [];

  // showIcon(index: number) {
  //   if (this.rating >= index + 1) {
  //     return "star";
  //   } else {
  //     return "star_border";
  //   }
  // }

  ngOnInit() {
    // for (let index = 0; index < this.starCount; index++) {
    //   this.ratingArr.push(index);
    // }
  }
}
