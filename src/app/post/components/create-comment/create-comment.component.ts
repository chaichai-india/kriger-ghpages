import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { CommentService } from "src/app/services/database/comment.service";
import { AuthService } from "src/app/services/authentication/auth.service";
import { TimestampService } from "src/app/services/utility/timestamp.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-create-comment",
  templateUrl: "./create-comment.component.html",
  styleUrls: ["./create-comment.component.css"]
})
export class CreateCommentComponent implements OnInit {
  @Input() postid: string;
  postCommentForm: FormGroup;
  progress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private authService: AuthService,
    private timeService: TimestampService,
    private _snackBar: MatSnackBar
  ) {}
  @ViewChild("commentautosize") autosize: CdkTextareaAutosize;

  buildform() {
    this.postCommentForm = this.formBuilder.group({
      text: ["", [Validators.required]]
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: "success-dialog"
    });
  }

  async postCommentSubmit() {
    const { text: string } = this.postCommentForm.value;
    if (string == "") {
      return;
    }
    console.log(string);
    const uid = await this.authService.userID;
    const timestamp = this.timeService.timestamp;
    let newComment = {
      string,
      timestamp,
      uid
    };
    this.postCommentForm.reset();
    this.progress = true;
    this.commentService
      .addPostComment(this.postid, newComment)
      .then(() => {
        console.log("comment posted");
        this.progress = false;
        this.openSnackBar("Comment", "Success");
      })
      .catch(err => {
        console.log(" comment not posted");
        this.progress = false;
        this.openSnackBar("Comment", "Failed");
      });
  }

  ngOnInit() {
    this.buildform();
  }
}
