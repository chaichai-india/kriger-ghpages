import { Component, OnInit } from "@angular/core";
import { KrigerService, ProfileService } from "../../../core";
import { BehaviorSubject, of } from "rxjs";
import { switchMap, tap, catchError } from "rxjs/operators";
import { DialogComponent } from "../../../shared/dialog/dialog.component";

import { MatDialog } from "@angular/material/dialog";
import { NetworkTipsComponent } from "../../network-tips/network-tips.component";

@Component({
  selector: "app-network-drawer",
  templateUrl: "./network-drawer.component.html",
  styleUrls: ["./network-drawer.component.css"],
})
export class NetworkDrawerComponent implements OnInit {
  connectionsCountSubject = new BehaviorSubject<number>(0);
  connectionsCount$ = this.connectionsCountSubject.asObservable();
  constructor(
    private krigerService: KrigerService,
    private profileService: ProfileService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
  }

  openTipsDialog() {
    const dialogRef = this.dialog.open(NetworkTipsComponent);
  }

  async init() {
    try {
      const user$ = await this.profileService.getUser();
      user$
        .pipe(
          switchMap(({ _id }) =>
            this.krigerService.getConnectionsCount({ user_id: _id })
          ),
          tap((data: number) => {
            console.log({ data });
            const connectionsCount = data || 0;
            this.connectionsCountSubject.next(connectionsCount);
          }),

          catchError((err) => {
            console.log({ err });
            return of(0);
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
