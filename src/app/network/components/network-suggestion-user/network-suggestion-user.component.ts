import { Component, OnInit, Input } from "@angular/core";
import { KrigerService, ProfileService, SnackbarService } from "../../../core";
import { take, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-network-suggestion-user",
  templateUrl: "./network-suggestion-user.component.html",
  styleUrls: ["./network-suggestion-user.component.css"],
})
export class NetworkSuggestionUserComponent implements OnInit {
  @Input() user;
  profileUrl = "/";
  constructor(
    private krigerService: KrigerService,
    private profileService: ProfileService,
    private snackbarService: SnackbarService
  ) {}

  setProfileUrl(user) {
    const { account_type = 0, username } = user;
    const types = ["learner", "educator", "institute"];
    const url0 = "in";
    const url1 = types[account_type];
    this.profileUrl = "/" + url0 + "/" + url1 + "/" + username;
  }

  setError() {}

  async sendRequest() {
    this.snackbarService.openSnackBar("request send");
    // try {
    //   const user$ = await this.profileService.getUser();
    //   user$
    //     .pipe(
    //       take(1),
    //       catchError((err) => {
    //         return of({});
    //       })
    //     )
    //     .subscribe();
    // } catch (error) {}
  }

  ngOnInit() {
    this.setProfileUrl(this.user);
  }
}
