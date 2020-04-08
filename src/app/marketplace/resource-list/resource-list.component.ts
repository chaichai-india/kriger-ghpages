import { Component, OnInit } from "@angular/core";
import { ResourceService } from "../../core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError, tap, take } from "rxjs/operators";

@Component({
  selector: "app-resource-list",
  templateUrl: "./resource-list.component.html",
  styleUrls: ["./resource-list.component.css"],
})
export class ResourceListComponent implements OnInit {
  constructor(private resourceService: ResourceService) {}
  resourceSubject = new BehaviorSubject<any>([]);
  resource$ = this.resourceSubject.asObservable();
  loading = new BehaviorSubject<Boolean>(true);
  loading$ = this.loading.asObservable();
  error: boolean = false;
  errorMessage: string;
  infiniteDisable: boolean = false;
  scrollCount: number = 0;
  lastResourceValue: number = 0;

  setErrorStatus(err, msg: string) {
    console.log({ err });
    this.loading.next(false);
    this.error = true;
    this.errorMessage = msg;
  }

  updateState(lastResourceValue: number) {
    this.loading.next(false);
    this.lastResourceValue = lastResourceValue;
  }

  nextBatch() {
    this.scrollCount++;
    if (this.scrollCount > 2) {
      this.infiniteDisable = true;
      return;
    }
    console.log("next batch");
    this.loading.next(true);
    this.resourceService
      .getResources({
        count: "10",
        resource_id: this.lastResourceValue.toString(),
        mode: "scroll",
      })
      .pipe(
        tap((data) => {
          const { resources = [] } = data || {};
          const currentresources = this.resourceSubject.getValue();
          this.resourceSubject.next([...currentresources, ...resources]);
          const lastResource = resources[resources.length - 1] || {};
          const { value = 0 } = lastResource;
          console.log({ value });
          this.updateState(value);
        }),
        take(1),
        catchError((err) => {
          this.setErrorStatus(err, "Something went wrong!");
          this.resourceSubject.next([]);
          return of({ resources: [] });
        })
      )
      .subscribe();
  }

  resetInfinite() {
    this.infiniteDisable = false;
    this.scrollCount = 0;
    this.nextBatch();
  }

  ngOnInit() {
    this.resourceService
      .getResources({ count: "10", resource_id: "0" })
      .pipe(
        tap((data) => {
          const { resources = [] } = data || {};
          // const currentresources = this.resourceSubject.getValue();
          this.resourceSubject.next(resources);
          const lastResource = resources[resources.length - 1] || {};
          const { value = 0 } = lastResource;
          console.log({ value });
          this.updateState(value);
        }),
        take(1),
        catchError((err) => {
          this.setErrorStatus(err, "Error!");
          this.resourceSubject.next([]);
          return of({ resources: [] });
        })
      )
      .subscribe();
  }
}
