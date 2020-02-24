import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ResourceService {
  constructor(private apiService: ApiService) {}

  getResources({ count = "10", resource_id = "0" }) {
    const path = `resource/all`;
    const headers = new HttpHeaders()
      .set("count", count)
      .set("resource_id", resource_id);
    return this.apiService.get({ path, headers });
  }
}
