import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class KrigerService {
  constructor(private apiService: ApiService) {}

  getSuggestions({ user_id }) {
    const path = `kriger/tab`;
    const headers = new HttpHeaders().set("user_id", user_id);

    return this.apiService.get({ path, headers });
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
}
