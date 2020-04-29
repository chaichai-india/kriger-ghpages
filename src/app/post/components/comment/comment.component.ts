// import { Component, OnInit, Input, NgZone } from "@angular/core";
// import { LikeService } from "../../../services/database/like.service";
// import { AuthService } from "../../../services/authentication/auth.service";
// import { TimestampService } from "../../../services/utility/timestamp.service";
// import { Router } from "@angular/router";

// @Component({
//   selector: "app-comment",
//   templateUrl: "./comment.component.html",
//   styleUrls: ["./comment.component.css"]
// })
// export class CommentComponent implements OnInit {
//   @Input() comment;
//   isCommentLiked: boolean;
//   uid = this.authService.userID;

//   constructor(
//     private likeService: LikeService,
//     private authService: AuthService,
//     private timeService: TimestampService,
//     private router: Router,
//     private zone: NgZone
//   ) {}

//   openProfile() {
//     this.comment.profileLink.then(snap => {
//       let username = snap.val();

//       this.zone.run(() => {
//         this.router.navigate([`/india/${username}`]);
//       });
//     });
//   }

//   async likeComment(postid: string, commentid: string) {
//     const uid = await this.authService.userID;
//     const timestamp = this.timeService.timestamp;

//     // console.log({ postid, uid });
//     if (!this.isCommentLiked) {
//       this.isCommentLiked = true;
//       this.likeService.postCommentLike(postid, commentid, uid, timestamp);
//     } else {
//       this.isCommentLiked = false;
//       this.likeService.postCommentDislike(postid, commentid, uid);
//     }
//   }

//   commentLiked(postid, commentid, uid) {
//     return this.likeService.likedPostComment(postid, commentid, uid);
//   }

//   initialize() {
//     this.commentLiked(this.comment.postid, this.comment.key, this.uid).then(
//       res => {
//         this.isCommentLiked = res ? true : false;
//       }
//     );
//   }

//   ngOnInit() {
//     this.initialize();
//   }
// }
