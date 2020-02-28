import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { ResourceService } from "../core";
import { catchError } from "rxjs/operators";

@Injectable()
export class ResourceResolver implements Resolve<any> {
  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log(route.params["resource_id"], "resolver");
    const resource_id = route.params["resource_id"];
    return this.resourceService
      .getExtendedResource(resource_id)
      .pipe(catchError(err => this.router.navigateByUrl("/404")));
  }
}
