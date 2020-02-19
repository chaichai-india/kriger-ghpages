import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-internship",
  template: `
    <div class="ribbon">
      <span>Internship/Research</span>
    </div>
    <div class="content">
      <div *ngIf="data?.internship && data?.internship.length">
        <div
          class="internship details"
          *ngFor="let internship of data?.internship"
        >
          <mat-icon fontSet="fas" fontIcon="fa-briefcase"></mat-icon>
          <div>
            <span class="name">{{ internship.name }}</span>
            <span class="description">{{ internship.description }}</span>
            <span class="year"
              >{{ internship.year_from }}
              {{ internship.year_to ? "- " + internship.year_to : null }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="placeholder"
        *ngIf="!data?.internship || !data?.internship.length"
      >
        <mat-icon fontSet="fas" fontIcon="fa-briefcase"></mat-icon>
        <span>Fill your Internship Details</span>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class InternshipComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
