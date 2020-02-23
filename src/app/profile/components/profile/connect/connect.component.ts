import { Component, OnInit } from "@angular/core";
import { NavDialogComponent } from "../../../../components/ui/navbar/navbar.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-profile-connect",
  template: `
    <button id="connect" (click)="openDialog()" mat-raised-button>
      Connect
    </button>
  `,
  styles: [
    `
      #connect {
        background-color: var(--primary-color);
        color: white;
        border-radius: 20px;
        font-family: var(--secondary-font-family);
      }
    `
  ]
})
export class ConnectComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NavDialogComponent);
  }
  ngOnInit() {}
}

@Component({
  selector: "profile-connect-dialog",
  template: ``,
  styles: [``]
})
export class ProfileConnectDialogComponent {}
