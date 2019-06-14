import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { DialogComponent } from "../../../post/components/post/post.component";
import { AuthService } from "src/app/services/authentication/auth.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { takeWhile, take } from "rxjs/operators";
import { UserService } from "src/app/services/database/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
  isLoggedIn: boolean;
  isLoggedInObservable;
  userDetails;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  setLoggedIn() {
    // this.authService.isLoggedIn().then(user => {
    //   this.isLoggedIn = user ? true : false;
    // });

    this.authService.loggedInUpdateObservable().then(status => {
      this.isLoggedInObservable = status;
      let copy = this.isLoggedInObservable;
      copy.subscribe(res => (res ? this.getUser() : false));
    });
  }

  async getUser() {
    const uid = await this.authService.userID;
    const userdetails = await this.userService.getUserDetail(uid);
    userdetails.pipe(take(1)).subscribe(details => {
      this.userDetails = { uid, details };
    });
    console.log({ uid, userdetails });
  }

  async logout() {
    await this.authService.signout();
    this.openSnackBar("Success!", "Logged Out");
    this.router.navigate(["/"]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: "success-dialog"
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.setLoggedIn();
  }
}
