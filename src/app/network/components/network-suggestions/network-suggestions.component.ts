import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-network-suggestions",
  templateUrl: "./network-suggestions.component.html",
  styleUrls: ["./network-suggestions.component.css"],
})
export class NetworkSuggestionsComponent implements OnInit {
  suggestionsSubject = new BehaviorSubject<any>([]);
  suggestions$ = this.suggestionsSubject.asObservable();
  constructor() {}

  ngOnInit() {}
}
