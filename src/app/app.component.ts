import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
// import { AuthService } from "./services/authentication/auth.service";
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { Gtag } from "angular-gtag";
import { AngularFireAuth } from "@angular/fire/auth";
import { isPlatformBrowser } from "@angular/common";
import { map, take } from "rxjs/operators";
// import { LoginService } from './services/authentication/login.service';
// import { SeoService } from './services/seo/seo.service';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "kriger-campus-website";
  loading: boolean = false;
  authResolved = false;

  constructor(
    private router: Router,
    gtag: Gtag,
    private afAuth: AngularFireAuth,
    @Inject(PLATFORM_ID) private platformId
  ) {
    // seo.setMetaTags();
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
      // console.log(this.loading);
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // show spinner till frontend can determine if user is logged in
      this.afAuth.authState
        .pipe(
          map((user) => !!user),
          take(1) // this way the observable completes and we don't need to unsubscribe
        )
        .subscribe(() => {
          this.authResolved = true;
        });
    } else {
      this.authResolved = true;
    }
  }
}

{
  // authResolved = false;
  // constructor(
  //   private afAuth: AngularFireAuth,
  //   @Inject(PLATFORM_ID) private platformId,
  // ) {}
  // ngOnInit() {
  //     if (isPlatformBrowser(this.platformId)) {
  //       // show spinner till frontend can determine if user is logged in
  //       this.afAuth.authState.pipe(
  //         map(user => !!user),
  //         take(1) // this way the observable completes and we don't need to unsubscribe
  //       ).subscribe(() => {
  //         this.authResolved = true;
  //       });
  //     }
  //   }
}
