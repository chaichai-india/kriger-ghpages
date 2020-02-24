import { Component, OnInit } from "@angular/core";
import { ResourceService } from "../../core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Component({
  selector: "app-resource-list",
  templateUrl: "./resource-list.component.html",
  styleUrls: ["./resource-list.component.css"]
})
export class ResourceListComponent implements OnInit {
  constructor(private resourceService: ResourceService) {}
  resources$: Observable<any>;
  loading = new BehaviorSubject<Boolean>(true);
  loading$ = this.loading.asObservable();
  error: boolean = false;
  errorMessage: string;

  setResources({ count = "10", resource_id = "0" }) {
    this.resources$ = this.resourceService.getResources({ count, resource_id });
  }

  setErrorStatus(err, msg: string) {
    console.log({ err });
    this.loading.next(false);
    this.error = true;
    this.errorMessage = msg;
  }

  setSuccessStatus() {
    this.loading.next(false);
  }

  ngOnInit() {
    this.resources$ = this.resourceService
      .getResources({ count: "10", resource_id: "0" })
      .pipe(
        tap(_ => this.setSuccessStatus()),
        catchError(err => {
          this.setErrorStatus(err, "Error!");
          return of({ resources: [] });
        })
      );
    // this.setResources({ count: "10", resource_id: "0" });
  }
}
