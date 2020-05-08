import { Component, OnInit, Input } from "@angular/core";
import { CommentService, ProfileService } from "../../../core";
import { Observable, BehaviorSubject } from "rxjs";
import { switchMap, take } from "rxjs/operators";
// import { tap } from "rxjs/operators";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.css"],
})
export class CommentListComponent implements OnInit {
  @Input() postid: string;
  comments = new BehaviorSubject<any>([]);
  comments$ = this.comments.asObservable();
  loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();

  constructor(
    private commentService: CommentService,
    private profileService: ProfileService
  ) {}

  async getComments() {
    try {
      const user$ = await this.profileService.getUser();
      user$
        .pipe(
          switchMap(({ _id }) =>
            this.commentService.getComments({
              post_id: this.postid,
              user_id: _id,
            })
          ),
          take(1)
        )
        .subscribe(
          (response) => {
            const comments = response.map((comment) => ({
              ...comment,
              post_id: this.postid,
            }));
            console.log({ comments });
            this.comments.next(comments);
          },
          (error) => console.log(error),
          () => {
            this.loading.next(false);
            console.log("getComments completed!");
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  async addNewCommentToList(comment) {
    const user$ = await this.profileService.getUser();
    user$
      .pipe(
        switchMap(({ _id }) =>
          this.profileService.getUserDetail({ user_id: _id })
        )
      )
      .subscribe((response) => {
        const user = response;
        const new_comment = { user, ...comment };
        const current_comments = this.comments.getValue();
        this.comments.next([new_comment, ...current_comments]);
      });
  }

  ngOnInit() {
    this.getComments();
    this.commentService.new_comment_added$.subscribe((new_comment) => {
      if (new_comment) this.addNewCommentToList(new_comment);
    });
  }
}
