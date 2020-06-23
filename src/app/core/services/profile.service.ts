import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";
import { shareReplay } from "rxjs/operators";
import { AuthService } from "../../services/authentication/auth.service";
import { KrigerService } from "./kriger.service";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private krigerService: KrigerService
  ) {}

  private userDetail$;
  private idFromFirebaseUID$;
  private uid;

  resetUser() {
    this.userDetail$ = null;
    this.idFromFirebaseUID$ = null;
    this.uid = null;
    this.krigerService.clear();
  }

  async getUser() {
    if (!this.uid) this.uid = await this.authService.getCurrentUser();
    if (this.uid) {
      return this.getIdbyFirebaseuid(this.uid);
    }
  }

  getIdByUsername(username: string) {
    const path = `profile/user/${username}`;
    return this.apiService.get({ path });
  }

  getProfile(user_id: string) {
    const path = `profile/all`;
    const headers = new HttpHeaders().set("user_id", user_id);
    return this.apiService.get({ path, headers });
  }

  getIdbyFirebaseuid(id: string) {
    const path = `profile/getId`;
    const headers = new HttpHeaders().set("user_id", id);
    if (!this.idFromFirebaseUID$) {
      this.idFromFirebaseUID$ = this.apiService
        .get({ path, headers })
        .pipe(shareReplay(1));
    }
    return this.idFromFirebaseUID$;
  }

  getUserDetail({ user_id }) {
    const path = `profile/userdetail`;
    const headers = new HttpHeaders().set("user_id", user_id);
    if (!this.userDetail$) {
      this.userDetail$ = this.apiService
        .get({ path, headers })
        .pipe(shareReplay(1));
    }
    return this.userDetail$;
  }
}
