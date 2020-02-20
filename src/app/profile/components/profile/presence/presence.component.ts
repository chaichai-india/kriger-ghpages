import { Component, OnInit, Input } from "@angular/core";
import { style } from "@angular/animations";

@Component({
  selector: "app-profile-presence",
  template: `
    <div class="ribbon"><span>Online Presence</span></div>
    <div class="content">
      <div class="website">
        <p class="title">Website</p>

        <!-- <a
          *ngIf="data.presence.website; else webp"
          [href]="data.presence.website"
          target="_blank"
          rel="noopener"
          >{{ data.presence.website }}</a
        >
        <ng-template #webp>NA</ng-template> -->
        <app-profile-presence-link
          [link]="data.presence.website"
        ></app-profile-presence-link>
      </div>
      <div class="facebook">
        <p class="title">Facebook</p>
        <app-profile-presence-link
          [link]="data.presence.facebook"
        ></app-profile-presence-link>
      </div>
      <div class="instagram">
        <p class="title">Instagram</p>
        <app-profile-presence-link
          [link]="data.presence.instagram"
        ></app-profile-presence-link>
      </div>
      <div class="linkedin">
        <p class="title">Linkedin</p>
        <app-profile-presence-link
          [link]="data.presence.linkedin"
        ></app-profile-presence-link>
      </div>
      <div class="twitter">
        <p class="title">Twitter</p>
        <app-profile-presence-link
          [link]="data.presence.twitter"
        ></app-profile-presence-link>
      </div>
      <div class="youtube">
        <p class="title">Youtube</p>
        <app-profile-presence-link
          [link]="data.presence.youtube"
        ></app-profile-presence-link>
      </div>
    </div>
  `,
  styleUrls: ["../profile.component.css"],
  styles: [
    `
      .content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 1rem 0;
        word-break: break-word;
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

@Component({
  selector: "app-profile-presence-link",
  template: `
    <a *ngIf="link; else linkp" [href]="link" target="_blank" rel="noopener">{{
      link
    }}</a>
    <ng-template #linkp>NA</ng-template>
  `,
  styles: [
    `
      a {
        text-decoration: unset;
      }
    `
  ]
})
export class PresenceLinkComponent implements OnInit {
  @Input() link;
  constructor() {}

  ngOnInit() {}
}
