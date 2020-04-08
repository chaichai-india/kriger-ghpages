import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private apiService: ApiService) {}

  getNotifications({
    count = "10",
    notification_id = "0",
    mode = "refresh",
    user_id,
  }) {
    const path = `notification`;
    const headers = new HttpHeaders()
      .set("user_id", user_id)
      .set("count", count)
      .set("notification_id", notification_id)
      .set("mode", mode);

    return this.apiService.get({ path, headers });
  }
}
