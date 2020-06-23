import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";
import { shareReplay, take } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class KrigerService {
  private suggestions$;
  private connectionsCountSubject = new BehaviorSubject<number>(0);
  private connectionsCount$;

  constructor(private apiService: ApiService) {}

  clear() {
    this.suggestions$ = null;
    this.connectionsCount$ = null;
  }

  getSuggestions({ user_id }) {
    const path = `kriger/tab`;
    const headers = new HttpHeaders().set("user_id", user_id);

    if (!this.suggestions$) {
      this.suggestions$ = this.apiService
        .get({ path, headers })
        .pipe(shareReplay(1));
    }
    return this.suggestions$;
  }

  postSuggestion({ user_id, accept_id, accept }) {
    const path = `kriger/suggestion`;
    const headers = new HttpHeaders().set("user_id", user_id);
    const body = { _id: accept_id, accept };

    return this.apiService.post({ path, headers, body });
  }

  getInvitations({ user_id }) {
    const path = `kriger/invitation`;
    const headers = new HttpHeaders().set("user_id", user_id);

    return this.apiService.get({ path, headers });
  }

  postInvitation({ user_id, accept_id, accept }) {
    const path = `kriger/invitation`;
    const headers = new HttpHeaders().set("user_id", user_id);
    const body = { _id: accept_id, accept };

    return this.apiService.post({ path, headers, body });
  }

  getConnections({ user_id, page_number }) {
    const path = `kriger/connections`;
    const headers = new HttpHeaders()
      .set("user_id", user_id)
      .set("page_number", page_number);

    return this.apiService.get({ path, headers });
  }

  getConnectionsCount({ user_id, refresh = false }) {
    const path = `kriger/count`;
    const headers = new HttpHeaders().set("user_id", user_id);

    if (refresh || !this.connectionsCount$) {
      if (!this.connectionsCount$) {
        this.connectionsCount$ = this.connectionsCountSubject
          .asObservable()
          .pipe(shareReplay(1));
      }
      this.apiService
        .get({ path, headers })
        .pipe(take(1))
        .subscribe(
          (data) => {
            const { count_connections = 0 } = data || {};
            this.connectionsCountSubject.next(count_connections);
          },
          (err) => {
            this.connectionsCountSubject.error(err);
          }
        );
    }

    return this.connectionsCount$;
  }
}
