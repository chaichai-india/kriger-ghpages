import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/authentication/auth.service";
import { ProfileService, NotificationService } from "../../core";
import { switchMap, catchError, tap, take } from "rxjs/operators";
import { BehaviorSubject, of } from "rxjs";

@Component({
  selector: "app-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.css"],
})
export class NotificationListComponent implements OnInit {
  uid: string;
  user_id: string;
  notificationSubject = new BehaviorSubject<any>([]);
  notification$ = this.notificationSubject.asObservable();
  loading = new BehaviorSubject<Boolean>(true);
  loading$ = this.loading.asObservable();
  error: boolean = false;
  errorMessage: string;
  infiniteDisable: boolean = true;
  scrollCount: number = 0;
  lastNotificationValue: number = 0;
  isEmpty: boolean = false;
  isComplete: boolean = false;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {}

  setErrorStatus(err, msg: string) {
    console.log({ err });
    this.loading.next(false);
    this.error = true;
    this.errorMessage = msg;
  }

  updateState(lastNotificationValue: number) {
    this.loading.next(false);
    this.lastNotificationValue = lastNotificationValue;
  }

  nextBatch() {
    this.scrollCount++;
    if (this.scrollCount > 2) {
      this.infiniteDisable = true;
      return;
    }
    console.log("next batch");
    this.loading.next(true);
    this.notificationService
      .getNotifications({
        mode: "scroll",
        user_id: this.user_id,
        notification_id: this.lastNotificationValue.toString(),
      })
      .pipe(
        tap((data) => {
          console.log({ data });
          const { notifications = [] } = data || {};
          const currentnotifications = this.notificationSubject.getValue();
          this.notificationSubject.next([
            ...currentnotifications,
            ...notifications,
          ]);

          const lastNotification =
            notifications[notifications.length - 1] || {};
          const { value = 0 } = lastNotification;
          console.log({ value });
          this.updateState(value);
          if (notifications.length == 0 || notifications.length < 10) {
            this.setCompleteState();
          }
        }),
        take(1),
        catchError((err) => {
          this.setErrorStatus(err, "Something went wrong!");
          this.notificationSubject.next([]);
          return of({ notifications: [] });
        })
      )
      .subscribe();
  }

  resetInfinite() {
    this.infiniteDisable = false;
    this.scrollCount = 0;
    this.nextBatch();
  }

  setEmptyState() {
    this.isEmpty = true;
    this.infiniteDisable = true;
  }

  setCompleteState() {
    this.infiniteDisable = true;
    this.isComplete = true;
  }

  setContinueState() {
    this.infiniteDisable = false;
  }

  async init() {
    try {
      this.uid = await this.authService.getCurrentUser();
      console.log({ uid: this.uid });
      if (this.uid) {
        this.profileService
          .getIdbyFirebaseuid(this.uid)
          .pipe(
            tap(({ _id }) => {
              this.user_id = _id;
            }),
            switchMap(({ _id }) =>
              this.notificationService.getNotifications({ user_id: _id })
            ),
            tap((data) => {
              console.log({ data });
              const { notifications = [] } = data || {};
              this.notificationSubject.next(notifications);
              const lastNotification =
                notifications[notifications.length - 1] || {};
              const { value = 0 } = lastNotification;
              console.log({ value });
              this.updateState(value);
              if (notifications.length == 0) {
                this.setEmptyState();
              } else if (notifications.length < 10) {
                this.setCompleteState();
              } else if (notifications.length == 10) {
                this.setContinueState();
              }
            }),
            take(1)
          )
          .subscribe();
      }
    } catch (error) {
      console.log(error);
    }
  }
  ngOnInit() {
    this.init();
  }
}
