import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
// import { DialogComponent } from "../../../post/components/post/post.component";
import { AuthService } from "../../../services/authentication/auth.service";
import { Router } from "@angular/router";
// import { BehaviorSubject } from "rxjs";
import { take, tap, switchMap } from "rxjs/operators";
// import { UserService } from "../../../services/database/user.service";
import { ProfileService, NotificationService } from "../../../core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
  isLoggedIn: boolean;
  isLoggedIn$;
  userDetails;
  isHome: boolean;
  uid: string;
  user_id: string;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  setLoggedIn() {
    this.authService.loggedInUpdateObservable().then((status) => {
      this.isLoggedIn$ = status;
      let copy = this.isLoggedIn$;
      copy.subscribe((res) => (res ? this.getUser() : false));
    });
  }

  async getUser() {
    this.uid = await this.authService.getCurrentUser();
    if (this.uid) {
      this.profileService
        .getIdbyFirebaseuid(this.uid)
        .pipe(
          tap(({ _id }) => {
            this.user_id = _id;
          }),
          switchMap(({ _id }) =>
            this.profileService.getUserDetail({ user_id: _id })
          ),
          tap((data) => {
            this.userDetails = data;
            console.log({ userdetails: this.userDetails });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  async logout() {
    await this.authService.signout();
    this.profileService.resetUser();
    !this.isNavbarCollapsed ? (this.isNavbarCollapsed = true) : false;

    this.openSnackBar("Success!", "Logged Out");
    this.router.navigate(["/"]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: "success-dialog",
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NavDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.router.events.subscribe((url: any) => {
      this.isHome = this.router.url == "/";
    });
    this.setLoggedIn();
  }
}

@Component({
  selector: "nav-post-dialog",
  templateUrl: "./nav.dialog.component.html",
  styleUrls: ["./nav.dialog.component.css"],
})
export class NavDialogComponent {}
