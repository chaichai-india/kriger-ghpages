import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { KrigerService, ProfileService } from "../../../core";
import { tap, switchMap, take, catchError } from "rxjs/operators";

@Component({
  selector: "app-network-invitations",
  templateUrl: "./network-invitations.component.html",
  styleUrls: ["./network-invitations.component.css"],
})
export class NetworkInvitationsComponent implements OnInit {
  invitationsSubject = new BehaviorSubject<any>([
    // {
    //   name: "John Doe",
    //   account_type: 1,
    //   username: "johndoe",
    //   headline: "i am the john doe",
    //   _id: "1234567890",
    // },
  ]);
  invitations$ = this.invitationsSubject.asObservable();
  user_id;
  loading = new BehaviorSubject<Boolean>(true);
  loading$ = this.loading.asObservable();
  error: boolean = false;
  errorMessage: string;
  isEmpty: boolean = false;

  constructor(
    private krigerService: KrigerService,
    private profileService: ProfileService
  ) {}

  getInvitations() {
    this.krigerService.getInvitations({ user_id: this.user_id });
  }

  setEmptyState() {
    this.isEmpty = true;
    this.loading.next(false);
  }

  setErrorStatus(err, msg: string) {
    console.log({ err });
    this.loading.next(false);
    this.error = true;
    console.log({ err });
    this.errorMessage = msg;
  }

  async init() {
    try {
      const user$ = await this.profileService.getUser();
      user$
        .pipe(
          tap(({ _id }) => {
            this.user_id = _id;
          }),
          switchMap(({ _id }) =>
            this.krigerService.getInvitations({ user_id: _id })
          ),
          tap((data: any[]) => {
            const invitations = data || [];
            this.invitationsSubject.next(invitations);
            if (invitations.length === 0) this.setEmptyState();
          }),
          take(1),
          catchError((err) => {
            if (err.status !== 404) {
              this.setErrorStatus(err, "Something went wrong!");
            } else {
              this.setEmptyState();
            }
            this.invitationsSubject.next([]);
            return of({ invitations: [] });
          })
        )
        .subscribe();
    } catch (error) {
      console.log({ error });
    }
  }

  ngOnInit() {
    this.init();
  }
}
