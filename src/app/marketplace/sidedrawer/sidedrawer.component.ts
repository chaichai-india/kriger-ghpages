import { Component, OnInit } from "@angular/core";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-marketplace-sidedrawer",
  templateUrl: "./sidedrawer.component.html",
  styleUrls: ["./sidedrawer.component.css"],
})
export class SidedrawerComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
  }
  ngOnInit() {}
}
