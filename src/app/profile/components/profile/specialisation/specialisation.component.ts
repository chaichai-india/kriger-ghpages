import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-specialisation",
  template: `
    <div class="ribbon">
      <span>Area of Specialisation</span>
    </div>
    <div class="content">
      <div *ngIf="data?.specialisation && data?.specialisation.length">
        <div
          class="specialisation details"
          *ngFor="let specialisation of data?.specialisation"
        >
          <mat-icon fontSet="fas" fontIcon="fa-medal"></mat-icon>
          <div>
            <span class="name">{{ specialisation.name }}</span>
            <span class="description">{{ specialisation.description }}</span>
            <span class="year"
              >{{ specialisation.year_from }}
              {{
                specialisation.year_to ? "- " + specialisation.year_to : null
              }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="placeholder"
        *ngIf="!data?.specialisation || !data?.specialisation.length"
      >
        <mat-icon fontSet="fas" fontIcon="fa-medal"></mat-icon>
        <span>Fill your Specialisation Details</span>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class SpecialisationComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
