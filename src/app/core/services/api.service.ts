import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface apiInput {
  path: string;
  params?: HttpParams;
  body?: any;
  headers?: HttpHeaders;
}
@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiUrl = environment.api_url;
  constructor(private http: HttpClient) {}

  private formatError(error: any) {
    return throwError(error.error);
  }

  get({
    path,
    params = new HttpParams(),
    headers = new HttpHeaders()
  }: apiInput): Observable<any> {
    return this.http
      .get(`${this.apiUrl}${path}`, { params, headers })
      .pipe(catchError(this.formatError));
  }
}
