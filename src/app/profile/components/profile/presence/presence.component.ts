import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-presence",
  template: `
    <div class="ribbon"><span>Online Presence</span></div>
    <div class="content">
      <div class="website">
        <p class="title">Website</p>
        <p>{{ data.presence.website ? data.presence.website : "NA" }}</p>
      </div>
      <div class="facebook">
        <p class="title">Facebook</p>
        <p>{{ data.presence.facebook ? data.presence.facebook : "NA" }}</p>
      </div>
      <div class="instagram">
        <p class="title">Instagram</p>
        <p>{{ data.presence.instagram ? data.presence.instagram : "NA" }}</p>
      </div>
      <div class="linkedin">
        <p class="title">Linkedin</p>
        <p>{{ data.presence.linkedin ? data.presence.linkedin : "NA" }}</p>
      </div>
      <div class="twitter">
        <p class="title">Twitter</p>
        <p>{{ data.presence.twitter ? data.presence.twitter : "NA" }}</p>
      </div>
      <div class="youtube">
        <p class="title">Youtube</p>
        <p>{{ data.presence.youtube ? data.presence.youtube : "NA" }}</p>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"],
  styles: [
    `
      .content {
        display: grid;
        grid-template-columns: repeat(auto-fit, 1fr);
        grid-gap: 1rem 0;
      }

      .content .title {
        color: rgba(0, 0, 0, 0.55);
        font-size: 0.8rem;
      }
    `
  ]
})
export class PresenceComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
