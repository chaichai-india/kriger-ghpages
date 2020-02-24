import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NavDialogComponent } from "../../../components/ui/navbar/navbar.component";

@Component({
  selector: "app-resource-thumb-body",
  templateUrl: "./resource-thumb-body.component.html",
  styleUrls: ["./resource-thumb-body.component.css"]
})
export class ResourceThumbBodyComponent implements OnInit {
  @Input() data;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NavDialogComponent);
  }
  ngOnInit() {}
}
