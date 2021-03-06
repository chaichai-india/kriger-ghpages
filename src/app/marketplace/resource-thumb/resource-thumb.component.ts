import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NavDialogComponent } from "../../components/ui/navbar/navbar.component";

@Component({
  selector: "app-resource-thumb",
  templateUrl: "./resource-thumb.component.html",
  styleUrls: ["./resource-thumb.component.css"]
})
export class ResourceThumbComponent implements OnInit {
  @Input() resource;
  headerData;
  bodyData;
  shareData;
  constructor(public dialog: MatDialog) {}

  setHeaderData(resource) {
    const { thumb, review, _id } = resource;
    return { thumb, review, _id };
  }

  setBodyData(resource) {
    const {
      _id,
      name,
      owner_id,
      owner_name,
      subject,
      exam,
      fees,
      fees_type,
      valid_till,
      expired
    } = resource;
    return {
      _id,
      name,
      owner_id,
      owner_name,
      subject,
      exam,
      fees,
      fees_type,
      valid_till,
      expired
    };
  }

  setShareData(resource) {
    const { _id } = resource;
    return { resource_id: _id };
  }

  setReview(resource) {
    const { review } = resource;
    return review;
  }

  openDialog() {
    const dialogRef = this.dialog.open(NavDialogComponent);
  }

  ngOnInit() {
    this.headerData = this.setHeaderData(this.resource);
    this.bodyData = this.setBodyData(this.resource);
    this.shareData = this.setShareData(this.resource);
  }
}
