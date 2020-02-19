import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-certification",
  template: `
    <div class="ribbon">
      <span>Certification</span>
    </div>
    <div class="content">
      <div *ngIf="data?.certification && data?.certification.length">
        <div
          class="certification details"
          *ngFor="let certificate of data?.certification"
        >
          <mat-icon fontSet="fas" fontIcon="fa-award"></mat-icon>
          <div>
            <span class="name">{{ certificate.name }}</span>
            <span class="description">{{ certificate.description }}</span>
            <span class="year"
              >{{ certificate.year_from }}
              {{
                certificate.year_to ? "- " + certificate.year_to : null
              }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="placeholder"
        *ngIf="!data?.certification || !data?.certification.length"
      >
        <mat-icon fontSet="fas" fontIcon="fa-award"></mat-icon>
        <span>Fill your Certification Details</span>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class CertificationComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
