import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map, shareReplay, take } from "rxjs/operators";
import { ProfileLinkService } from "./profile-link.service";

@Injectable({
  providedIn: "root"
})
export class CommentService {
  postCommentRef = this.db.database.ref("/Post_Comment");
  constructor(
    private db: AngularFireDatabase,
    private profileLinkService: ProfileLinkService
  ) {}

  getPostComments(postid: string) {
    return this.postCommentRef.child(postid).once("value");
  }

  getUserDetail(uid: string) {
    return this.db
      .object(`/User_Detail/${uid}`)
      .valueChanges()
      .pipe(take(1));
  }

  getCommentLikes(postid: string, commentid: string) {
    return this.db
      .object(`/Post_Comment_Like_Counter/${postid}/${commentid}`)
      .valueChanges()
      .pipe(shareReplay(1));
  }

  getPostComments$(postid: string) {
    return this.db
      .list(`Post_Comment/${postid}`, ref => ref.orderByKey())
      .snapshotChanges()
      .pipe(
        shareReplay(1),
        map(comments =>
          comments.map(comment => {
            let payload: any = comment.payload.val();
            let { uid } = payload;
            let key = comment.payload.key;
            let userdetail = this.getUserDetail(uid);
            let commentLikes = this.getCommentLikes(postid, key);
            let profileLink = this.profileLinkService.getProfileLink(uid);
            return {
              postid,
              commentLikes,
              userdetail,
              key,
              profileLink,
              ...comment.payload.val()
            };
          })
        )
      );
  }
}
