import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogComponent } from "../../../shared/dialog/dialog.component";
import { ProfileService, PostService } from "../../../core";
import { switchMap, take } from "rxjs/operators";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  @Input() post;
  liked = false;
  count_likes = 0;
  profileUrl;
  showComments: boolean;

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private postService: PostService
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
  }

  async likePost() {
    const { _id: post_id } = this.post;
    this.toggleLikeState();

    const user$ = await this.profileService.getUser();
    user$
      .pipe(
        switchMap(({ _id }) =>
          this.postService.likePost({
            post_id,
            user_id: _id,
            like: +this.liked,
          })
        ),
        take(1)
      )
      .subscribe(
        (response) => console.log("post like response", response),
        (error) => this.likeError(error),
        () => console.log("post like complete!")
      );
  }

  likeError(error) {
    console.log("post like error", error);
    this.toggleLikeState();
  }

  toggleLikeState() {
    this.liked = !this.liked;
    if (this.liked) this.count_likes++;
    else this.count_likes--;
  }

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
    const { user, is_like = 0, count_likes } = post;
    this.liked = !!is_like;
    this.count_likes = count_likes;
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
