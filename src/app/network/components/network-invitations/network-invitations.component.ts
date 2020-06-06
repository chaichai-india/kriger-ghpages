import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-network-invitations",
  templateUrl: "./network-invitations.component.html",
  styleUrls: ["./network-invitations.component.css"],
})
export class NetworkInvitationsComponent implements OnInit {
  invitationsSubject = new BehaviorSubject<any>([
    {
      name: "John Doe",
      account_type: 1,
      username: "johndoe",
      headline: "i am the john doe",
      _id: "1234567890",
    },
  ]);
  invitations$ = this.invitationsSubject.asObservable();
  constructor() {}

  ngOnInit() {}
}
