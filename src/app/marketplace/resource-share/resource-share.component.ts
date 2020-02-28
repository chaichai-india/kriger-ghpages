import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "app-resource-share",
  template: `
    <button
      (click)="openShare()"
      [ngClass]="{ 'extended-btn': extendedBtn }"
      mat-button
    >
      <mat-icon>share</mat-icon>
      <span>Share</span>
    </button>
  `,
  styles: [
    `
      .extended-btn {
        height: 32px;
        border-radius: 20px;
        border: 1px solid var(--primary-color);
        display: flex;
        place-items: center;
        place-content: center;
        color: grey;
        line-height: 16px;
        background-color: white;
      }
    `
  ]
})
export class ResourceShareComponent implements OnInit {
  @Input() data;
  extendedBtn: boolean = false;
  constructor(public dialog: MatDialog) {}

  openShare() {
    const dialogRef = this.dialog.open(ShareResourceDialogComponent, {
      data: { resource_id: this.data.resource_id }
    });
  }

  ngOnInit() {
    console.log(this.data, "sharebtn");
    const { extended = false } = this.data || {};
    this.extendedBtn = extended;
  }
}

@Component({
  selector: "app-resource-share-dialog",
  templateUrl: "./resource-share.dialog.component.html",
  styleUrls: ["./resource-share.dialog.component.css"]
})
export class ShareResourceDialogComponent {
  isCopied: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ShareResourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
