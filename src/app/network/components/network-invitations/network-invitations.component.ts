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
  invitationsSubject = new BehaviorSubject<any>([]);
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

  setFillState() {
    this.loading.next(false);
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
            else this.setFillState();
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
