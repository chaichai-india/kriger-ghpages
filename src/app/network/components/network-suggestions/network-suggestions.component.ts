import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-network-suggestions",
  templateUrl: "./network-suggestions.component.html",
  styleUrls: ["./network-suggestions.component.css"],
})
export class NetworkSuggestionsComponent implements OnInit {
  suggestionsSubject = new BehaviorSubject<any>([
    {
      name: "John Doe",
      account_type: 1,
      username: "johndoe",
      headline: "i am the john doe",
      _id: "1234567890",
    },
  ]);
  suggestions$ = this.suggestionsSubject.asObservable();
  constructor() {}

  ngOnInit() {}
}
