import { Component, OnInit, Input, NgZone } from "@angular/core";
import { MatDialog } from "@angular/material";
import { LikeService } from "../../../services/database/like.service";
import { AuthService } from "../../../services/authentication/auth.service";
import { TimestampService } from "../../../services/utility/timestamp.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  @Input() post;
  uid = this.authService.userID;
  isPostLiked: boolean;
  showComments: boolean;

  constructor(
    public dialog: MatDialog,
    private likeService: LikeService,
    private authService: AuthService,
    private timeService: TimestampService,
    private router: Router,
    private zone: NgZone
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openComments() {
    if (this.uid) {
      this.showComments = true;
    } else {
      this.openDialog();
    }
  }

  postLiked(postid, uid) {
    return this.likeService.likedPost(postid, uid);
  }

  async likePost(postid: string) {
    if (this.uid) {
      const uid = await this.authService.userID;
      const timestamp = this.timeService.timestamp;

      // console.log({ postid, uid });
      if (!this.isPostLiked) {
        this.isPostLiked = true;
        this.likeService.postLike(postid, uid, timestamp);
      } else {
        this.isPostLiked = false;
        this.likeService.postDislike(postid, uid);
      }
    } else {
      this.openDialog();
    }
  }

  openProfile(username: string) {
    if (this.uid) {
      this.zone.run(() => {
        this.router.navigate([`/india/${username}`]);
      });
      return false;
    } else {
      this.openDialog();
      return false;
    }
  }

  initialize() {
    if (this.uid) {
      this.postLiked(this.post.key, this.uid).then(res => {
        this.isPostLiked = res ? true : false;
      });
    }

    // console.log(this.post.profileLink);
  }

  ngOnInit() {
    this.initialize();
  }
}

@Component({
  selector: "app-post-dialog",
  templateUrl: "./post.dialog.component.html",
  styleUrls: ["./post.dialog.component.css"]
})
export class DialogComponent {}
