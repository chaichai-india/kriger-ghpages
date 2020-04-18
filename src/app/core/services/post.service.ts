import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private apiService: ApiService) {}

  getPosts({ count = "10", post_id = "0", mode = "refresh", user_id }) {
    const path = `post`;
    const headers = new HttpHeaders()
      .set("count", count)
      .set("post_id", post_id)
      .set("mode", mode)
      .set("user_id", user_id);

    return this.apiService.get({ path, headers });
  }

  getExtendedPost({ post_id, user_id }) {
    const path = `post/extended`;
    const headers = new HttpHeaders()
      .set("post_id", post_id)
      .set("user_id", user_id);
    return this.apiService.get({ path, headers });
  }
}
