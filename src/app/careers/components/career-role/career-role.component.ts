import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-career-role",
  template: `
    <div class="container">
      <div class="posting-role">
        <h2>{{ data.role }}</h2>
        <div class="posting-categories">
          <div *ngFor="let item of data.categories">{{ item }}</div>
        </div>
      </div>
      <div class="apply-btn">
        <a
          class="apply"
          mat-stroked-button
          href="https://forms.gle/PSFhTcfq8bGHdLiz8"
          target="_blank"
          >Apply</a
        >
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        padding: 2rem 0 2rem 0;
      }

      .posting-role h2 {
        font-size: 2rem;
        padding-bottom: 1rem;
      }

      .posting-categories > div {
        display: inline-block;
        margin-right: 0.5rem;
        text-transform: uppercase;
        color: #808080;
        font-size: 14px;
      }

      .apply-btn {
        display: grid;
        justify-content: center;
        align-items: center;
      }

      .apply {
        width: 100px;
        border-color: var(--primary-color);
        color: white;
        background-color: var(--primary-color);
      }

      @media screen and (max-width: 750px) {
        .container {
          gap: 1rem;
          justify-items: center;
          grid-template-columns: 1fr;
        }

        .posting-categories {
          display: flex;
          justify-content: center;
        }
      }
    `
  ]
})
export class CareerRoleComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
