import { Component, OnInit, Input, NgZone, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
// import { LikeService } from "../../../services/database/like.service";
import { AuthService } from "../../../services/authentication/auth.service";
// import { TimestampService } from "../../../services/utility/timestamp.service";
import { Router } from "@angular/router";
import { DialogComponent } from "../../../shared/dialog/dialog.component";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  @Input() post;
  profileUrl;
  showComments: boolean;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
  }

  // openComments() {
  //   if (this.uid) {
  //     this.showComments = true;
  //   } else {
  //     this.openDialog();
  //   }
  // }

  // openProfile(username: string) {
  //   if (this.uid) {
  //     this.zone.run(() => {
  //       this.router.navigate([`/india/${username}`]);
  //     });
  //     return false;
  //   } else {
  //     this.openDialog();
  //     return false;
  //   }
  // }

  // openShare() {
  //   if (this.uid) {
  //     const dialogRef = this.dialog.open(ShareDialogComponent, {
  //       data: { key: this.post.key }
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       // console.log(`Dialog result: ${result}`);
  //     });
  //   } else {
  //     this.openDialog();
  //   }
  // }
  setProfileUrl(user) {
    const { account_type = 0, username } = user;
    const types = ["learner", "educator", "institute"];
    const url0 = "in";
    const url1 = types[account_type];
    this.profileUrl = "/" + url0 + "/" + url1 + "/" + username;
  }

  initialize(post) {
    const { user } = post;
    this.setProfileUrl(user);
  }

  ngOnInit() {
    this.initialize(this.post);
  }
}

@Component({
  selector: "app-post-share-dialog",
  templateUrl: "./post-share.dialog.component.html",
  styleUrls: ["./post-share.dialog.component.css"],
})
export class ShareDialogComponent {
  isCopied: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
