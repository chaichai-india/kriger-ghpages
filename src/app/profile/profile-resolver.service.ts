import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { ProfileService } from "../core";
import { catchError, switchMap } from "rxjs/operators";

@Injectable()
export class ProfileResolver implements Resolve<any> {
  constructor(private profileService: ProfileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.params["username"], "resolver");
    return this.profileService.getIdByUsername(route.params["username"]).pipe(
      switchMap(({ user_id }) => this.profileService.getProfile(user_id)),
      catchError(err => this.router.navigateByUrl("/404"))
    );
  }
}
