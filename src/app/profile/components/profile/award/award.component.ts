import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-award",
  template: `
    <div class="ribbon">
      <span>Award</span>
    </div>
    <div class="content">
      <div *ngIf="data?.award && data?.award.length">
        <div class="award details" *ngFor="let award of data?.award">
          <mat-icon fontSet="fas" fontIcon="fa-trophy"></mat-icon>
          <div>
            <span class="name">{{ award.name }}</span>
            <span class="description">{{ award.description }}</span>
            <span class="year"
              >{{ award.year_from }}
              {{ award.year_to ? "- " + award.year_to : null }}</span
            >
          </div>
        </div>
      </div>
      <div class="placeholder" *ngIf="!data?.award || !data?.award.length">
        <mat-icon fontSet="fas" fontIcon="fa-trophy"></mat-icon>
        <span>Fill your Award Details</span>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class AwardComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
