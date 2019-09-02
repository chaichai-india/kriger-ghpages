import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfileLinkService } from "../../../services/database/profile-link.service";
import { ProfileService } from "../../../services/database/profile.service";
import { CorporateService } from "../../../services/database/corporate.service";
import { EXAMS } from "../../data/exams";
import { SUBJECTS } from "../../data/subject";

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
  exams = EXAMS;
  subjects = SUBJECTS;

  resetValues() {
    this.loading = true;
    this.profile_found = true;
  }

  setValues(snaps: any[]) {
    if (!snaps) {
      this.loading = false;
      return;
    }

    this.details = snaps[0] ? snaps[0].val() : null;
    if (this.details.type[0] < 20) {
      this.userType = "learner";
    } else if (this.details.type[0] >= 20 && this.details.type[0] <= 39) {
      this.userType = "educator";
    } else {
      this.userType = "corporate";
    }
    // console.log('TCL: ProfileComponent -> setValues -> details', this.details);
    this.counters = snaps[1];
    // console.log(
    // 'TCL: ProfileComponent -> setValues -> counters',
    // this.counters
    // );
    this.userDetails = snaps[2];
    let { college, coaching } = this.userDetails;
    if (college) {
      for (let i = 0; i < college.length; i++) {
        const name = college[i].name;
        if (name > 0) {
          this.getCorporateName(name).then(name => (college[i].name = name));
        }

        this.userDetails.college = college;
      }
    }
    if (coaching) {
      for (let i = 0; i < coaching.length; i++) {
        const name = coaching[i].name;
        if (name > 0) {
          this.getCorporateName(name).then(name => (coaching[i].name = name));
        }

        this.userDetails.coaching = coaching;
      }
    }

    // console.log(
    //   "TCL: ProfileComponent -> setValues -> userDetails",
    //   this.userDetails
    // );

    this.loading = false;
  }

  getCorporateName(value: number) {
    return this.corporateService.getCorporateName(value);
  }

  async getProfileData(name: string) {
    let username = name;
    let isProfile = await this.profileLinkService
      .isProfileLink(username)
      .then(res => {
        // console.log("TCL: ProfileComponent -> getProfileData -> res", res);
        return res;
      });

    if (isProfile) {
      try {
        const { key } = isProfile;
        const details = this.profileService.getDetails(key);
        const counters = this.profileService.getCounter(key);
        const userDetails = this.profileService.getUserDetails1(key);

        const profileInfo = await Promise.all([details, counters, userDetails]);
        return profileInfo;
      } catch (err) {
        return err;
      }
    } else {
      return false;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private profileLinkService: ProfileLinkService,
    private profileService: ProfileService,
    private corporateService: CorporateService
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.params["username"];
    this.resetValues();

    // console.log(
    // 'TCL: ProfileComponent -> ngOnInit -> this.username',
    // this.username
    // );
    this.getProfileData(this.username).then(snaps => {
      // console.log("TCL: ProfileComponent -> ngOnInit -> snaps", snaps);
      this.profile_found = snaps ? true : false;
      this.setValues(snaps);
    });
  }
}
