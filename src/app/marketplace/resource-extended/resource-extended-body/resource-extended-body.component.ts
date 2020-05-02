import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NavDialogComponent } from "../../../components/ui/navbar/navbar.component";

@Component({
  selector: "app-resource-extended-body",
  templateUrl: "./resource-extended-body.component.html",
  styleUrls: ["./resource-extended-body.component.css"],
})
export class ResourceExtendedBodyComponent implements OnInit {
  @Input() data;
  rating: number = 0;
  ratingArr = [];
  fieldTitle = {
    language: "Language",
    fee: "Fee",
    enquire: "Enquire Now",
  };
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

  setTitle(resource) {
    const { type } = resource;
    const languageTeachingResources = [
      "Classroom Learning",
      "E-Learning",
      "Home Tuitions",
    ];
    const priceResources = ["E-Test Paper", "E-Book/PDF"];
    if (languageTeachingResources.includes(type))
      this.fieldTitle["language"] = "Language of teaching";
    if (priceResources.includes(type)) {
      this.fieldTitle["fee"] = "Price";
      this.fieldTitle["enquire"] = "Buy Now";
    }
  }

  ngOnInit() {
    console.log(this.data, "body");
    this.rating = this.data.review;
    this.setTitle(this.data);
    for (let index = 0; index < 5; index++) {
      this.ratingArr.push(index);
    }
  }
}
