import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-additional",
  templateUrl: "./additional.component.html",
  styles: [
    `
      .ribbon {
        width: 100%;
        margin: 1em 0;
        font-size: 1.2em;
        font-weight: 500;
        padding-left: 1em;
      }

      .full_width {
        width: 100%;
      }

      .divider {
        box-shadow: 0 8px 4px -5px #00000024;
        padding-bottom: 1rem;
      }

      .content {
        padding-left: 1em;
      }

      .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem 0;
      }

      .content .title {
        color: rgba(0, 0, 0, 0.55);
        font-size: 0.8rem;
      }

      .content .placeholder {
        display: flex;
        align-items: center;
      }

      .content .placeholder span {
        color: rgba(0, 0, 0, 0.55);
      }

      .content .placeholder mat-icon,
      .content .details mat-icon {
        width: 2em;
        height: 100%;
        height: 1em;
        font-size: 2em;
      }

      .content .details {
        display: grid;
        align-items: center;
        grid-template-columns: 4em auto;
      }

      .content .details div {
        display: flex;
        flex-direction: column;
        margin-bottom: 1em;
      }

      .content .details div .name {
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
    `,
  ],
})
export class AdditionalComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
