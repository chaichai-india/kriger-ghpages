import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";
import { of } from "rxjs";

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

  likePost({ post_id, user_id, like }) {
    const path = `post/like`;
    const headers = new HttpHeaders().set("user_id", user_id);
    const body = { like, post_id };
    return this.apiService.post({ path, headers, body });
  }

  createPost({ user_id, body, file }) {
    const path = `post`;
    const formData: FormData = new FormData();
    formData.append("post", JSON.stringify(body));
    formData.append("file", file);
    formData.forEach(console.log);
    const headers = new HttpHeaders().set("user_id", user_id);
    return this.apiService.post({ path, headers, body: formData });
  }
}
