import { Component, OnInit } from "@angular/core";
import { PARTNERS, FEATUREDIMAGES, AWARDS } from "./images-data";
import { MatDialog } from "@angular/material";

import { NavDialogComponent } from "../ui/navbar/navbar.component";

@Component({
  selector: "app-newlandingpage",
  templateUrl: "./newlandingpage.component.html",
  styleUrls: ["./newlandingpage.component.css"],
})
export class NewlandingpageComponent implements OnInit {
  featuredImages = FEATUREDIMAGES;
  partnerImages = PARTNERS;
  awardImages = AWARDS;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NavDialogComponent);
  }

  ngOnInit() {}
}
