import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-coaching",
  template: `
    <div class="ribbon">
      <span>Coaching</span>
    </div>
    <div class="content">
      <div *ngIf="data?.coaching && data?.coaching.length">
        <div class="coaching details" *ngFor="let coaching of data?.coaching">
          <mat-icon fontSet="fas" fontIcon="fa-chalkboard-teacher"></mat-icon>
          <div>
            <span class="name">{{ coaching.name }}</span>
            <span class="description">{{ coaching.description }}</span>
            <span class="year"
              >{{ coaching.year_from }}
              {{ coaching.year_to ? "- " + coaching.year_to : null }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="placeholder"
        *ngIf="!data?.coaching || !data?.coaching.length"
      >
        <mat-icon fontSet="fas" fontIcon="fa-chalkboard-teacher"></mat-icon>
        <span>Fill your Coaching Details</span>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class CoachingComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
