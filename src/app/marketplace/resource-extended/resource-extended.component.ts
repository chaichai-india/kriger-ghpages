import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-resource-extended",
  templateUrl: "./resource-extended.component.html",
  styleUrls: ["./resource-extended.component.css"],
})
export class ResourceExtendedComponent implements OnInit {
  data;
  headerData;
  bodyData;
  constructor(private route: ActivatedRoute) {}

  setHeaderData(data) {
    const { _id, thumb, original } = data;
    console.log({ _id, original, data }, "setHeader");
    return { original, resource_id: _id, thumb };
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
      expired,
      description,
      count_views,
      count_shares,
      timestamp,
      type,
      class_type,
      review,
      count_reviews,
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
      expired,
      description,
      count_views,
      count_shares,
      timestamp,
      type,
      class_type,
      review,
      count_reviews,
    };
  }

  ngOnInit() {
    this.data = this.route.snapshot.data.data;
    console.log({ data: this.data });
    this.headerData = this.setHeaderData(this.data);
    this.bodyData = this.setBodyData(this.data);
  }
}
