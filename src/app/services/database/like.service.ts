import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class LikeService {
  postLikeRef = this.db.database.ref("/Post_Like");
  // postLikeListRef = this.db.list("Post_Like");
  postCommentLikeRef = this.db.database.ref("/Post_Comment_Like");

  async postLike(postid: string, uid: string, timestamp: string) {
    this.postLikeRef
      .child(postid)
      .child(uid)
      .set(timestamp);
  }

  postDislike(postid: string, uid: string) {
    this.postLikeRef
      .child(postid)
      .child(uid)
      .remove();
  }

  async likedPost(postid: string, uid: string) {
    return await this.postLikeRef
      .child(postid)
      .once("value")
      .then(snapshot => snapshot.hasChild(uid));
  }

  async postCommentLike(
    postid: string,
    commentid: string,
    uid: string,
    timestamp: string
  ) {
    this.postCommentLikeRef
      .child(postid)
      .child(commentid)
      .child(uid)
      .set(timestamp);
  }

  postCommentDislike(postid: string, commentid: string, uid: string) {
    this.postCommentLikeRef
      .child(postid)
      .child(commentid)
      .child(uid)
      .remove();
  }

  async likedPostComment(postid: string, commentid: string, uid: string) {
    return await this.postCommentLikeRef
      .child(postid)
      .child(commentid)
      .once("value")
      .then(snapshot => snapshot.hasChild(uid));
  }

  constructor(private db: AngularFireDatabase) {}
}
