import { Injectable, NgZone } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  ActivatedRoute
} from "@angular/router";
import { ProfileService } from "../core";
// import { catchError, switchMap, tap } from "rxjs/operators";

@Injectable()
export class ProfileResolver implements Resolve<any> {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params["username"], "resolver");
    console.log(route.parent.url, "resolver");
    const username = route.params["username"];
    const urlPath = route.parent.url;
    return this.pathResolver(username, urlPath).catch(err => {
      console.log("resolve", { err });
      this.router.navigateByUrl("/404");
    });
  }

  pathResolver(username: string, urlPath) {
    return this.profileService
      .getIdByUsername(username)
      .toPromise()
      .then(data => {
        console.log("pathResolver", { data });
        return this.checkPathAndResolve({ data, username, urlPath });
      });
  }

  checkPathAndResolve({ data, username, urlPath }) {
    const url = urlPath[urlPath.length - 1].path;
    console.log("parent url", { url });
    const { user_id, account_type } = data;
    const pathMap = ["learner", "educator", "institute"];
    if (pathMap[account_type] == url) {
      return this.profileService.getProfile(user_id).toPromise();
    } else {
      this.zone.run(_ =>
        this.router.navigateByUrl(`/in/${pathMap[account_type]}/${username}`)
      );
    }
  }
  // pathResolver(username: string) {
  //   this.profileService.getIdByUsername(username).pipe(
  //     tap(this.checkPath),
  //     switchMap(({ user_id }) => this.profileService.getProfile(user_id)),
  //     catchError(err => this.router.navigateByUrl("/404"))
  //   );
  // }

  // checkPath({user_id, account_type}) {
  //   console.log('checkPath', {user_id, account_type});
  //   if(user_id) {
  //      this.activatedRoute.parent.url.subscribe(urlPath => {
  //       const url = urlPath[urlPath.length - 1].path;
  //       console.log('parent url', {url});
  //       if(account_type == 0) {
  //         if(url == 'l') return this.profileService.getProfile(user_id);
  //         else this.router.navigateByUrl()
  //       } else if (account_type == 1) {

  //       } else {

  //       }
  //     })
  //   } else {
  //     this.router.navigateByUrl("/404")
  //   }
  // }
}
