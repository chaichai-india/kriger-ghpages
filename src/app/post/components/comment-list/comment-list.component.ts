import { Component, OnInit, Input } from "@angular/core";
import { CommentService, ProfileService } from "../../../core";
import { Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";
// import { tap } from "rxjs/operators";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.css"],
})
export class CommentListComponent implements OnInit {
  @Input() postid: string;
  comments;
  comments$: Observable<any[]>;
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
            this.comments = response.map((comment) => ({
              ...comment,
              post_id: this.postid,
            }));
          },
          (error) => console.log(error),
          () => console.log("getComments completed!")
        );
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    this.getComments();
  }
}
