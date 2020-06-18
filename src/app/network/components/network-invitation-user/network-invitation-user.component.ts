import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpEventType } from "@angular/common/http";
import { ProfileService, KrigerService, SnackbarService } from "../../../core";
import { switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-network-invitation-user",
  templateUrl: "./network-invitation-user.component.html",
  styleUrls: ["./network-invitation-user.component.css"],
})
export class NetworkInvitationUserComponent implements OnInit {
  @Input() user;
  profileUrl = "/";
  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private profileService: ProfileService,
    private krigerService: KrigerService,
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

  async sendRequest(invite_id, accept) {
    try {
      const user$ = await this.profileService.getUser();
      user$
        .pipe(
          switchMap(({ _id }) =>
            this.krigerService.postInvitation({
              user_id: _id,
              accept_id: invite_id,
              accept,
            })
          ),
          catchError((err) => {
            console.log({ err });
            this.setError();
            return of({});
          })
        )
        .subscribe(
          (event) => {
            if (event.type === HttpEventType.Response) {
              const message = accept
                ? `You are now connected with ${this.user.name}`
                : "Invitation Declined!";
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
