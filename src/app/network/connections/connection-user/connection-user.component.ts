import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-connection-user",
  templateUrl: "./connection-user.component.html",
  styleUrls: ["./connection-user.component.css"],
})
export class ConnectionUserComponent implements OnInit {
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
