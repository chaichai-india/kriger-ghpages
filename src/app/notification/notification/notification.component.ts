import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "../../shared/dialog/dialog.component";

@Component({
  selector: "app-notification",
  template: `
    <div class="notification__container" (click)="openDialog()">
      <div
        class="notification-thumb"
        [ngStyle]="{
          'background-image':
            'url(' +
            notification?.thumb +
            '), url(../../../assets/images/resource_default.jpeg)'
        }"
      ></div>
      <div class="notification-body">
        <div class="notification-text">{{ notification?.text }}</div>
        <div class="notification-timestamp">
          {{ notification?.timestamp | amFromUnix | amDateFormat: "LLL" }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .notification__container {
        display: flex;
        width: 400px;
        min-height: 64px;
        align-items: center;
        padding: 8px;
        box-shadow: var(--primary-box-shadow);
        /* border: 1px solid rgba(0, 0, 0, 0.1); */
        background-color: white;
        cursor: pointer;
      }

      .notification-thumb {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: relative;
        background-size: cover;
        background-position: center;
      }

      .notification-thumb::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(
          305.27deg,
          rgba(0, 0, 0, 0.7) 0.19%,
          rgba(0, 0, 0, 0) 54.37%
        );
      }

      .notification-body {
        width: calc(100% - 48px);
        padding: 0 0 0 8px;
      }

      .notification-text {
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
      }

      .notification-timestamp {
        font-size: 0.7rem;
        color: rgba(0, 0, 0, 0.5);
      }
    `,
  ],
})
export class NotificationComponent implements OnInit {
  @Input() notification;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
  }
  ngOnInit() {}
}
