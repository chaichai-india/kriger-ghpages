import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { KrigerService, ProfileService } from "../../../core";
import { tap, switchMap, take, catchError } from "rxjs/operators";

@Component({
  selector: "app-network-suggestions",
  templateUrl: "./network-suggestions.component.html",
  styleUrls: ["./network-suggestions.component.css"],
})
export class NetworkSuggestionsComponent implements OnInit {
  suggestionsSubject = new BehaviorSubject<any>([]);
  suggestions$ = this.suggestionsSubject.asObservable();
  user_id;
  loading = new BehaviorSubject<Boolean>(true);
  loading$ = this.loading.asObservable();
  error: boolean = false;
  errorMessage: string;
  isEmpty: boolean = false;

  constructor(
    private krigerService: KrigerService,
    private profileService: ProfileService
  ) {}

  getSuggestions() {
    this.krigerService.getSuggestions({ user_id: this.user_id });
  }

  setEmptyState() {
    this.isEmpty = true;
    this.loading.next(false);
  }

  setErrorStatus(err, msg: string) {
    console.log({ err });
    this.loading.next(false);
    this.error = true;
    console.log({ err });
    this.errorMessage = msg;
  }

  setFillState() {
    this.loading.next(false);
  }

  async init() {
    try {
      const user$ = await this.profileService.getUser();
      user$
        .pipe(
          tap(({ _id }) => {
            this.user_id = _id;
          }),
          switchMap(({ _id }) =>
            this.krigerService.getSuggestions({ user_id: _id })
          ),
          tap((data: any[]) => {
            const suggestions = data || [];
            this.suggestionsSubject.next(suggestions);
            if (suggestions.length === 0) this.setEmptyState();
            else this.setFillState();
          }),
          take(1),
          catchError((err) => {
            if (err.status !== 404) {
              this.setErrorStatus(err, "Something went wrong!");
            } else {
              this.setEmptyState();
            }
            this.suggestionsSubject.next([]);
            return of({ suggestions: [] });
          })
        )
        .subscribe();
    } catch (error) {
      console.log({ error });
    }
  }

  ngOnInit() {
    this.init();
  }
}
