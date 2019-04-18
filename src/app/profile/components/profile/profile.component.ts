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
    }
  }
  constructor(
    private route: ActivatedRoute,
    private profileLinkService: ProfileLinkService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];

    console.log(
      'TCL: ProfileComponent -> ngOnInit -> this.username',
      this.username
    );
    this.getProfileData(this.username).then(snaps => {
      console.log('TCL: ProfileComponent -> ngOnInit -> snaps', snaps);
      snaps.forEach(snap => {
        let data = snap.val();
        console.log('TCL: ProfileComponent -> ngOnInit -> data', data);
      });
    });
  }
}
