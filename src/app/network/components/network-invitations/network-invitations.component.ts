import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-network-invitations",
  templateUrl: "./network-invitations.component.html",
  styleUrls: ["./network-invitations.component.css"],
})
export class NetworkInvitationsComponent implements OnInit {
  invitationsSubject = new BehaviorSubject<any>([]);
  invitations$ = this.invitationsSubject.asObservable();
  constructor() {}

  ngOnInit() {}
}
