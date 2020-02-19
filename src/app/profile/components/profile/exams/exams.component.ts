import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-exams",
  template: `
    <div class="ribbon">
      <span
        >Exams
        {{
          data?.account_type == 1
            ? "I teach"
            : data?.account_type == 2
            ? "We teach"
            : "I am preparing for"
        }}</span
      >
    </div>
    <div class="content">
      <div class="exam details" *ngIf="data?.exam && data?.exam.length">
        <mat-icon fontSet="far" fontIcon="fa-newspaper"></mat-icon>
        <mat-chip-list>
          <mat-chip *ngFor="let exam of data?.exam" color="primary" selected>{{
            exam
          }}</mat-chip>
        </mat-chip-list>
      </div>

      <div class="placeholder" *ngIf="!data?.exam || !data?.exam.length">
        <mat-icon fontSet="far" fontIcon="fa-newspaper"></mat-icon>
        <span>Fill your Exam Details</span>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"]
})
export class ExamsComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
