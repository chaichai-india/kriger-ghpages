import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NavDialogComponent } from "src/app/components/ui/navbar/navbar.component";

@Component({
  selector: "app-resource-extended-body",
  templateUrl: "./resource-extended-body.component.html",
  styleUrls: ["./resource-extended-body.component.css"]
})
export class ResourceExtendedBodyComponent implements OnInit {
  @Input() data;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NavDialogComponent);
  }
  ngOnInit() {
    console.log(this.data, "body");
  }
}
