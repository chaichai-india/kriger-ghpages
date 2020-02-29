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
  rating: number = 0;
  ratingArr = [];
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NavDialogComponent);
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }

  ngOnInit() {
    console.log(this.data, "body");
    this.rating = this.data.review;
    for (let index = 0; index < 5; index++) {
      this.ratingArr.push(index);
    }
  }
}
