import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  getIdByUsername(username: string) {
    const path = `profile/user/${username}`;
    return this.apiService.get({ path });
  }
  getProfile(user_id: string) {
    const path = `profile/all`;
    const headers = new HttpHeaders().set("user_id", user_id);
    return this.apiService.get({ path, headers });
  }
}