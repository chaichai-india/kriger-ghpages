import { Component, OnInit, Input } from "@angular/core";
import { CommentService, ProfileService } from "../../../core";
import { Observable, BehaviorSubject } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { DialogComponent } from "../../../shared/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

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
  error = new BehaviorSubject<boolean>(false);
  error$ = this.error.asObservable();

  constructor(
    private commentService: CommentService,
    private profileService: ProfileService,
    public dialog: MatDialog
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
          (error) => {
            this.loading.next(false);
            console.log(error);
          },
          () => {
            this.loading.next(false);
            console.log("getComments completed!");
          }
        );
    } catch (error) {
      this.loading.next(false);
      this.error.next(true);
      console.log(error);
      if (error === "No user logged in") {
        this.openDialog();
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
  }

  async addNewCommentToList(comment) {
    if (comment.post_id === this.postid) {
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
  }

  ngOnInit() {
    this.getComments();
    this.commentService.new_comment_added$.subscribe((new_comment) => {
      if (new_comment) this.addNewCommentToList(new_comment);
    });
  }
}
