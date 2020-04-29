// import { Component, OnInit, Input } from "@angular/core";
// import { CommentService } from "../../../services/database/comment.service";
// import { Observable } from "rxjs";
// // import { tap } from "rxjs/operators";

// @Component({
//   selector: "app-comment-list",
//   templateUrl: "./comment-list.component.html",
//   styleUrls: ["./comment-list.component.css"]
// })
// export class CommentListComponent implements OnInit {
//   @Input() postid: string;
//   comments;
//   comments$: Observable<any[]>;
//   constructor(private commentService: CommentService) {}

//   async setComments() {
//     await this.commentService
//       .getPostComments(this.postid)
//       .then(commentSnaps => {
//         this.comments = commentSnaps.val();
//         console.log(this.comments);
//       });
//   }

//   async setComments$() {
//     this.comments$ = await this.commentService.getPostComments$(this.postid);
//     // this.comments$.pipe(tap(comments => console.log(comments))).subscribe();
//   }

//   ngOnInit() {
//     this.setComments$();
//   }
// }
