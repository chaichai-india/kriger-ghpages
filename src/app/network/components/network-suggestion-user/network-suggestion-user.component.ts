import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { KrigerService, ProfileService, SnackbarService } from "../../../core";
import { take, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-network-suggestion-user",
  templateUrl: "./network-suggestion-user.component.html",
  styleUrls: ["./network-suggestion-user.component.css"],
})
export class NetworkSuggestionUserComponent implements OnInit {
  @Input() user;
  profileUrl = "/";
  // test id
  // 5d7f7c8fb3b18a0b1cd34d32
  // user id
  // 5d7f7c8fb3b18a0b1cd34c83
  @Output() messageEvent = new EventEmitter<string>();

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

  setError() {
    this.snackbarService.openErrorBar("Something went wrong!");
  }

  async sendRequest(suggest_id, accept) {
    try {
      const user$ = await this.profileService.getUser();
      user$
        .pipe(
          switchMap(({ _id }) =>
            this.krigerService.postSuggestion({
              user_id: _id,
              accept_id: suggest_id,
              accept,
            })
          ),
          catchError((err) => {
            console.log(err);
            this.setError();
            return of({});
          })
        )
        .subscribe(
          (event) => {
            if (event.type === HttpEventType.Response) {
              const message = accept ? "Request Sent!" : "Suggestion Removed!";
              this.snackbarService.openSnackBar(message);
              this.messageEvent.emit(this.user.user_id);
            }
          },
          (err) => console.log({ err })
        );
    } catch (error) {
      console.log({ error });
    }
  }

  ngOnInit() {
    this.setProfileUrl(this.user);
  }
}
