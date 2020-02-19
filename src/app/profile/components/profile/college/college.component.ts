import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-college",
  template: `
    <div class="ribbon">
      <span>School/College/Institute</span>
    </div>
    <div class="content">
      <div *ngIf="data?.college && data?.college.length">
        <div class="college details" *ngFor="let college of data?.college">
          <mat-icon fontSet="fas" fontIcon="fa-graduation-cap"></mat-icon>
          <div>
            <span class="name">{{ college.name }}</span>
            <span class="description">{{ college.description }}</span>
            <span class="year"
              >{{ college.year_from }}
              {{ college.year_to ? "- " + college.year_to : null }}</span
            >
          </div>
        </div>
      </div>
      <div class="placeholder" *ngIf="!data?.college || !data?.college.length">
        <mat-icon fontSet="fas" fontIcon="fa-graduation-cap"></mat-icon>
        <span>Fill your Education Details</span>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class CollegeComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
