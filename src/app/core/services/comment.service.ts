import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  constructor(private apiService: ApiService) {}

  getComments({ post_id, user_id }) {
    const path = `comment`;
    const headers = new HttpHeaders()
      .set("post_id", post_id)
      .set("user_id", user_id);

    return this.apiService.get({ path, headers });
  }

  likeComment({ post_id, user_id, like, comment_id }) {
    const path = `comment/like`;
    const headers = new HttpHeaders().set("user_id", user_id);
    const body = { like, post_id, comment_id };
    return this.apiService.post({ path, headers, body });
  }
}
