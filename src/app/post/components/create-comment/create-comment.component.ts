import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { CommentService, ProfileService, SnackbarService } from "../../../core";
import { switchMap } from "rxjs/operators";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-create-comment",
  templateUrl: "./create-comment.component.html",
  styleUrls: ["./create-comment.component.css"],
})
export class CreateCommentComponent implements OnInit {
  @Input() postid: string;
  postCommentForm: FormGroup;
  progress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private commentService: CommentService,
    private snackbarService: SnackbarService
  ) {}

  @ViewChild("commentautosize") autosize: CdkTextareaAutosize;
  @ViewChild("postcommentform") postcommentform;

  buildform() {
    this.postCommentForm = this.formBuilder.group({
      text: ["", [Validators.required]],
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackbarService.openSnackBar(message, action);
  }

  getHashtags(text) {
    const regexp = /\B\#\w\w+\b/g;
    const result = text.match(regexp);
    if (result) return result.map((hashtag) => hashtag.replace("#", ""));
    return [];
  }

  async postCommentSubmit() {
    const { text } = this.postCommentForm.value;
    if (text == "") {
      return;
    }
    console.log(text);

    const mention_tag = this.getHashtags(text);
    console.log({ mention_tag });

    let body = {
      text,
      mention_tag,
    };

    this.postCommentForm.reset();
    this.postcommentform.resetForm();
    this.progress = true;

    const user$ = await this.profileService.getUser();
    user$
      .pipe(
        switchMap(({ _id }) =>
          this.commentService.setComment({
            user_id: _id,
            post_id: this.postid,
            body,
          })
        )
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.Response) {
            this.openSnackBar("Comment", "Success");
            const timestamp = Math.round(+new Date() / 1000);
            this.commentService.updateNewComment({
              ...body,
              timestamp,
              post_id: this.postid,
            });
          }
        },
        (error) => {
          this.openSnackBar("Comment", "Failed");
        },
        () => {
          this.progress = false;
        }
      );
  }

  ngOnInit() {
    this.buildform();
  }
}
