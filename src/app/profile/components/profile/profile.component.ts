import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileLinkService } from 'src/app/services/database/profile-link.service';

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
    let isProfile = await this.profileService
      .isProfileLink(username)
      .then(res => {
        console.log('TCL: ProfileComponent -> getProfileData -> res', res);
        return res;
      });

    if (isProfile) {
    }
  }
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileLinkService
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];

    console.log(
      'TCL: ProfileComponent -> ngOnInit -> this.username',
      this.username
    );
    this.getProfileData(this.username);
  }
}
