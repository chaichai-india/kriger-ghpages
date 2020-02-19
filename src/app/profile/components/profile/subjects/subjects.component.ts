import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-subjects",
  template: `
    <div class="ribbon">
      <span
        >Subjects
        {{
          data?.account_type == 1
            ? "I teach"
            : data?.account_type == 2
            ? "We teach"
            : "I study"
        }}
      </span>
    </div>
    <div class="content">
      <div
        class="subject details"
        *ngIf="data?.subject && data?.subject.length"
      >
        <mat-icon fontSet="fas" fontIcon="fa-book-open"></mat-icon>
        <mat-chip-list>
          <mat-chip
            *ngFor="let subject of data?.subject"
            color="primary"
            selected
            >{{ subject }}</mat-chip
          >
        </mat-chip-list>
      </div>

      <div class="placeholder" *ngIf="!data?.subject || !data?.subject.length">
        <mat-icon fontSet="fas" fontIcon="fa-book-open"></mat-icon>
        <span>Fill your Subject Details</span>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class SubjectsComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
