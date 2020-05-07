import { Component, OnInit, Input } from "@angular/core";
import { ProfileService, CommentService } from "../../../core";
import { switchMap, take } from "rxjs/operators";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  @Input() comment;
  liked: boolean;
  profileUrl;
  count_likes = 0;

  constructor(
    private profileService: ProfileService,
    private commentService: CommentService
  ) {}

  setProfileUrl(user) {
    const { account_type = 0, username } = user;
    const types = ["learner", "educator", "institute"];
    const url0 = "in";
    const url1 = types[account_type];
    this.profileUrl = "/" + url0 + "/" + url1 + "/" + username;
  }

  async likeComment() {
    const { _id: comment_id, post_id } = this.comment;
    this.toggleLikeState();

    const user$ = await this.profileService.getUser();
    user$
      .pipe(
        switchMap(({ _id }) =>
          this.commentService.likeComment({
            post_id,
            user_id: _id,
            comment_id,
            like: +this.liked,
          })
        ),
        take(1)
      )
      .subscribe(
        (response) => console.log("comment like response", response),
        (error) => this.likeError(error),
        () => console.log("comment like complete!")
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

  initialize() {
    const { user, is_like, count_likes } = this.comment;
    this.liked = !!is_like;
    this.count_likes = +count_likes;
    this.setProfileUrl(user);
  }

  ngOnInit() {
    this.initialize();
  }
}
