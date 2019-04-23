import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileLinkService } from 'src/app/services/database/profile-link.service';
import { ProfileService } from 'src/app/services/database/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  key: string;
  profile_found: boolean;
  loading: boolean;
  details: any;
  counters: any;
  userDetails: any;

  resetValues() {
    this.loading = true;
    this.profile_found = true;
  }

  setValues(snaps: any[]) {
    if (!snaps) {
      this.loading = false;
      return;
    }

    this.details = snaps[0].val();
    console.log('TCL: ProfileComponent -> setValues -> details', this.details);
    this.counters = snaps[1];
    console.log(
      'TCL: ProfileComponent -> setValues -> counters',
      this.counters
    );
    this.userDetails = snaps[2];
    console.log(
      'TCL: ProfileComponent -> setValues -> userDetails',
      this.userDetails
    );

    this.loading = false;
  }

  async getProfileData(name: string) {
    let username = name;
    let isProfile = await this.profileLinkService
      .isProfileLink(username)
      .then(res => {
        console.log('TCL: ProfileComponent -> getProfileData -> res', res);
        return res;
      });

    if (isProfile) {
      try {
        const { key } = isProfile;
        const details = this.profileService.getDetails(key);
        const counters = this.profileService.getCounter(key);
        const userDetails = this.profileService.getUserDetails(key);

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
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.resetValues();

    console.log(
      'TCL: ProfileComponent -> ngOnInit -> this.username',
      this.username
    );
    this.getProfileData(this.username).then(snaps => {
      console.log('TCL: ProfileComponent -> ngOnInit -> snaps', snaps);
      this.profile_found = snaps ? true : false;
      this.setValues(snaps);
    });
  }
}
