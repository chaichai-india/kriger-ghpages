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
  username: string;
  key: string;
  profile_found: boolean;
  loading: boolean;
  details: any;
  counters: any;
  userDetails: any;
  userType: "learner" | "educator" | "corporate";

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.params["username"];
    this.profileService;
  }
}
