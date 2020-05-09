import { Injectable, NgZone } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  ActivatedRoute,
} from "@angular/router";
import { PostService } from "../core";
// import { catchError, switchMap, tap } from "rxjs/operators";

@Injectable()
export class PostResolver implements Resolve<any> {
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params["id"], "resolver");
    const post_id = route.params["id"];
    return this.pathResolver(post_id).catch((err) => {
      console.log("resolve error", { err });
      this.router.navigateByUrl("/404");
    });
  }

  pathResolver(post_id: string) {
    console.log({ post_id });
    return this.postService
      .getExtendedPost({ post_id, user_id: "null" })
      .toPromise()
      .then((data) => {
        console.log("pathResolver", { data });
        return data;
      });
  }
}
