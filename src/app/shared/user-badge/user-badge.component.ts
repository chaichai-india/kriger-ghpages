import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-user-badge",
  template: `
    <div
      *ngIf="account_type > 0 && account_type < 3"
      [ngClass]="{
        educator: account_type === 1,
        institute: account_type === 2
      }"
    >
      {{ text }}
    </div>
  `,
  styles: [
    `
      div {
        border-radius: 10px;
        width: 100%;
        color: white;
        font-size: 0.5rem;
        padding: 2px 0 2px 4px;
        text-transform: uppercase;
      }

      .educator {
        background-color: #00c851;
      }

      .institute {
        background-color: #ffbb33;
      }
    `,
  ],
})
export class UserBadgeComponent implements OnInit {
  @Input() account_type = 0;
  text: string;
  constructor() {}

  ngOnInit() {
    if (this.account_type === 1) this.text = "educator";
    if (this.account_type === 2) this.text = "institute";
  }
}
