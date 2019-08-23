import { Component, OnInit } from "@angular/core";
// import { AuthService } from "./services/authentication/auth.service";
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";
// import { LoginService } from './services/authentication/login.service';
// import { SeoService } from './services/seo/seo.service';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "kriger-campus-website";
  loading: boolean = false;

  constructor(private router: Router) {
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

  // logoutIfLogin() {
  //   this.authService.isLoggedInPromise().then(user => {
  //     if (user) {
  //       const { email } = user;
  //       if (email === "ashish@kriger.in") {
  //         this.authService.signout();
  //       }
  //     }
  //   });
  // }

  // async login() {
  //   await this.loginService.loginIfNotAuth();
  // }

  ngOnInit() {
    // this.login().then(() => console.log('logged In'));
    // localStorage.setItem("user", null);
    // this.logoutIfLogin();
  }
}
