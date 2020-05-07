import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { CommentService } from "../../../core";
import { MatSnackBar } from "@angular/material";

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
    private commentService: CommentService,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild("commentautosize") autosize: CdkTextareaAutosize;
  @ViewChild("postcommentform") postcommentform;

  buildform() {
    this.postCommentForm = this.formBuilder.group({
      text: ["", [Validators.required]],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: "success-dialog",
    });
  }

  async postCommentSubmit() {
    const { text } = this.postCommentForm.value;
    if (text == "") {
      return;
    }
    console.log(text);

    let body = {
      text,
    };

    this.postCommentForm.reset();
    this.postcommentform.resetForm();
    this.progress = true;
    // this.commentService
    //   .setComment({ user_id: _id, post_id: this.postid, body })

    //   .then(() => {
    //     // console.log("comment posted");
    //     this.progress = false;
    //     this.openSnackBar("Comment", "Success");
    //   })
    //   .catch((err) => {
    //     // console.log(" comment not posted");
    //     this.progress = false;
    //     this.openSnackBar("Comment", "Failed");
    //   });
  }

  ngOnInit() {
    this.buildform();
  }
}
