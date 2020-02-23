import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-header",
  template: `
    <div
      mat-card-avatar
      class="profile__photo"
      [ngStyle]="{
        'background-image':
          'url(' + data?.original + '), url(../../../../assets/images/user.svg)'
      }"
    ></div>
    <h2 class="profile__name">{{ data?.name }}</h2>
    <div class="profile__type">
      {{
        data?.account_type == 1
          ? "educator"
          : data.account_type == 2
          ? "institute"
          : "learner"
      }}
    </div>
    <div class="content">
      <div class="posts">
        <span>{{ data?.count_posts }}</span>
        <span>Posts</span>
      </div>
      <div class="groups">
        <span>{{ data?.count_groups }}</span>
        <span>Groups</span>
      </div>
      <div class="krigers">
        <span>{{ data?.count_connections }}</span>
        <span>Krigers</span>
      </div>
      <!-- <div class="views">
      <span>Profile Views</span>
      <span>{{
        counters?.count_profileviews ? counters?.count_profileviews : '0'
      }}</span>
    </div> -->
    </div>
  `,
  styles: [
    `
      .profile__photo {
        height: 9.5em;
        width: 9.5em;
        background-size: cover;
        background-position: 50%;
      }

      .profile__name {
        /* font-family: "Lato", "Helvetica Neue", sans-serif; */
        color: white;
        padding-top: 1rem;
      }

      .profile__type {
        color: var(--primary-color);
        text-transform: uppercase;
        background: white;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        padding: 0.2rem 1rem;
        border-radius: 10px;
        text-align: center;
        font-weight: bold;
      }

      .content {
        display: flex;
        justify-content: space-around;
        width: 100%;
        color: white;
        font-size: 0.8rem;
        padding-top: 1rem;
      }

      .content div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `
  ]
})
export class HeaderComponent implements OnInit {
  @Input() data;
  constructor() {}

  ngOnInit() {}
}
