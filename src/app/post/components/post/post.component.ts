import { Component, OnInit, Input, NgZone } from "@angular/core";
import { MatDialog } from "@angular/material";
import { LikeService } from "src/app/services/database/like.service";
import { AuthService } from "src/app/services/authentication/auth.service";
import { TimestampService } from "src/app/services/utility/timestamp.service";
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

  postLiked(postid, uid) {
    return this.likeService.likedPost(postid, uid);
  }

  async likePost(postid: string) {
    const uid = await this.authService.userID;
    const timestamp = this.timeService.timestamp;

    console.log({ postid, uid });
    if (!this.isPostLiked) {
      this.isPostLiked = true;
      this.likeService.postLike(postid, uid, timestamp);
    } else {
      this.isPostLiked = false;
      this.likeService.postDislike(postid, uid);
    }
  }

  openProfile() {
    this.post.profileLink.then(snap => {
      let username = snap.val();

      this.zone.run(() => {
        this.router.navigate([`/india/${username}`]);
      });
    });
  }

  initialize() {
    this.postLiked(this.post.key, this.uid).then(res => {
      this.isPostLiked = res ? true : false;
    });

    console.log(this.post.profileLink);
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
