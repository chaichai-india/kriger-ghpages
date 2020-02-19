import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-about",
  template: `
    <div class="ribbon">
      <span>{{ data.account_type < 2 ? "About Me" : "About" }}</span>
    </div>
    <div class="content">
      <div class="about">
        <span
          [ngStyle]="!data?.summary ? { color: 'rgba(0, 0, 0, 0.55)' } : false"
          >{{ data?.summary ? data?.summary : "About Me" }}</span
        >
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class AboutComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
