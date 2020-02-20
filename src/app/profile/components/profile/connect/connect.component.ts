import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile-connect",
  template: `
    <button id="connect" mat-raised-button>Connect</button>
  `,
  styles: [
    `
      #connect {
        background-color: blue;
        color: white;
      }
    `
  ]
})
export class ConnectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: "profile-connect-dialog",
  template: ``,
  styles: [``]
})
export class ProfileConnectDialogComponent {}
