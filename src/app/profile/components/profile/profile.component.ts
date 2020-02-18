import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "../../../core";
// import { EXAMS } from "../../data/exams";
// import { SUBJECTS } from "../../data/subject";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  data: any;
  headerData: any;
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  setHeaderData(data) {
    const {
      userdetail,
      count_posts = 0,
      count_groups = 0,
      count_connections = 0,
      account_type = 0
    } = data;
    const { original = "", name = "" } = userdetail || {};
    return {
      original,
      name,
      account_type,
      count_posts,
      count_groups,
      count_connections
    };
  }

  ngOnInit() {
    this.data = this.route.snapshot.data.data;
    this.headerData = this.setHeaderData(this.data);
    console.log(this.data);
  }
}
