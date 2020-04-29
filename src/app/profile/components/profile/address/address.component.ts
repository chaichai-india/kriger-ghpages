import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-address",
  template: `
    <div class="ribbon"><span>Address</span></div>
    <div class="content" *ngIf="!isEmpty">
      <span *ngIf="data.address.house">{{ data.address.house }}, </span>
      <span *ngIf="data.address.street">{{ data.address.street }}, </span>
      <span *ngIf="data.address.landmark">{{ data.address.landmark }}, </span>
      <span *ngIf="data.address.address_city"
        >{{ data.address.address_city }},
      </span>
      <span *ngIf="data.address.address_state"
        >{{ data.address.address_state }},
      </span>
      <span *ngIf="data.address.address_country"
        >{{ data.address.address_country }},
      </span>
      <span *ngIf="data.address.pincode">{{ data.address.pincode }}</span>
    </div>
    <div class="placeholder" *ngIf="isEmpty">Details Not Filled</div>
  `,
  styles: [
    `
      .placeholder {
        padding-left: 1em;
      }
    `,
  ],
  styleUrls: ["../profile.component.css"],
})
export class AddressComponent implements OnInit {
  @Input() data;
  isEmpty = false;
  constructor() {}

  ngOnInit() {
    const { address = {} } = this.data || {};
    if (Object.keys(address).length === 0) this.isEmpty = true;
    const isValuesEmpty = Object.values(address).reduce(
      (a, b) => +!!a + +!!b,
      0
    );
    console.log({ isValuesEmpty });
    if (isValuesEmpty === 0) this.isEmpty = true;
  }
}
