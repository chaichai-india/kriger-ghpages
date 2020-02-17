import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  getIdByUsername(username: string) {
    const path = `profile/user/${username}`;
    return this.apiService.get({ path });
  }
  // getProfile(username: string) {}
}
