import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-publication",
  template: `
    <div class="ribbon">
      <span>Publication</span>
    </div>
    <div class="content">
      <div *ngIf="data?.publication && data?.publication.length">
        <div
          class="publication details"
          *ngFor="let publication of data?.publication"
        >
          <mat-icon fontSet="fas" fontIcon="fa-book"></mat-icon>
          <div>
            <span class="name">{{ publication.name }}</span>
            <span class="description">{{ publication.description }}</span>
            <span class="year"
              >{{ publication.year_from }}
              {{
                publication.year_to ? "- " + publication.year_to : null
              }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="placeholder"
        *ngIf="!data?.publication || !data?.publication.length"
      >
        <mat-icon fontSet="fas" fontIcon="fa-book"></mat-icon>
        <span>Fill your Publication Details</span>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class PublicationComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
