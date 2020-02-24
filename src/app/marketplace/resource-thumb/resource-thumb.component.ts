import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-resource-thumb",
  templateUrl: "./resource-thumb.component.html",
  styleUrls: ["./resource-thumb.component.css"]
})
export class ResourceThumbComponent implements OnInit {
  @Input() resource;
  headerData;
  bodyData;
  constructor() {}

  setHeaderData(resource) {
    const { thumb, count_reviews, review } = resource;
    return { thumb, count_reviews, review };
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

  ngOnInit() {
    this.headerData = this.setHeaderData(this.resource);
    this.bodyData = this.setBodyData(this.resource);
  }
}
