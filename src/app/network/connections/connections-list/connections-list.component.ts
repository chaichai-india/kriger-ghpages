import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { ProfileService, KrigerService } from "../../../core";
import { tap, switchMap, take, catchError } from "rxjs/operators";

@Component({
  selector: "app-connections-list",
  templateUrl: "./connections-list.component.html",
  styleUrls: ["./connections-list.component.css"],
})
export class ConnectionsListComponent implements OnInit {
  user_id: string;
  connectionsSubject = new BehaviorSubject<any>([]);
  connections$ = this.connectionsSubject.asObservable();
  loading = new BehaviorSubject<Boolean>(true);
  loading$ = this.loading.asObservable();
  error: boolean = false;
  errorMessage: string;
  infiniteDisable: boolean = true;
  scrollCount: number = 0;
  isEmpty: boolean = false;
  isComplete: boolean = false;

  constructor(
    private profileService: ProfileService,
    private krigerService: KrigerService
  ) {}

  setErrorStatus(err, msg: string) {
    console.log({ err });
    this.loading.next(false);
    this.error = true;
    this.errorMessage = msg;
  }

  updateState() {
    this.loading.next(false);
  }

  setEmptyState() {
    this.isEmpty = true;
    this.infiniteDisable = true;
    this.loading.next(false);
  }

  setCompleteState() {
    this.infiniteDisable = true;
    this.isComplete = true;
  }

  setContinueState() {
    this.infiniteDisable = false;
  }

  nextBatch() {
    this.scrollCount++;

    console.log("next batch");
    this.loading.next(true);
    this.krigerService
      .getConnections({
        user_id: this.user_id,
        page_number: this.scrollCount,
      })
      .pipe(
        tap((data) => {
          console.log({ data });

          const connections = data || [];
          const currentconnections = this.connectionsSubject.getValue();
          this.connectionsSubject.next([...currentconnections, ...connections]);
          this.updateState();
          if (connections.length == 0 || connections.length < 10) {
            this.setCompleteState();
          }
        }),
        take(1),
        catchError((err) => {
          this.setErrorStatus(err, "Something went wrong!");
          this.connectionsSubject.next([]);
          return of({ connections: [] });
        })
      )
      .subscribe();
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
            this.krigerService.getConnections({ user_id: _id, page_number: 0 })
          ),
          tap((data: any[]) => {
            console.log({ data });
            // const { notifications = [] } = data || {};
            const connections = data || [];
            this.connectionsSubject.next(connections);

            this.updateState();
            if (connections.length === 0) {
              this.setEmptyState();
            } else if (connections.length < 10) {
              this.setCompleteState();
            } else if (connections.length === 10) {
              this.setContinueState();
            }
          }),
          take(1),
          catchError((err) => {
            if (err.status !== 404) {
              this.setErrorStatus(err, "Something went wrong!");
            } else {
              this.setEmptyState();
            }
            this.connectionsSubject.next([]);
            return of({ connections: [] });
          })
        )
        .subscribe();
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    this.init();
  }
}
