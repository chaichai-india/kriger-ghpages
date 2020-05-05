import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthService } from "../../../services/authentication/auth.service";
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

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
  }

  likePost() {
    const { is_like, _id } = this.post;
    if (is_like === 0) {
      // like post
    } else {
      // dislike post
    }
  }

  // openComments() {
  //   if (this.uid) {
  //     this.showComments = true;
  //   } else {
  //     this.openDialog();
  //   }
  // }

  openShare() {
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      data: { key: this.post._id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }
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
