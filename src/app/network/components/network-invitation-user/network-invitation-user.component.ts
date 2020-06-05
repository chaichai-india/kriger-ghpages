import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-network-invitation-user",
  templateUrl: "./network-invitation-user.component.html",
  styleUrls: ["./network-invitation-user.component.css"],
})
export class NetworkInvitationUserComponent implements OnInit {
  @Input() user;
  profileUrl = "/";
  constructor() {}

  setProfileUrl(user) {
    const { account_type = 0, username } = user;
    const types = ["learner", "educator", "institute"];
    const url0 = "in";
    const url1 = types[account_type];
    this.profileUrl = "/" + url0 + "/" + url1 + "/" + username;
  }

  ngOnInit() {
    this.setProfileUrl(this.user);
  }
}
