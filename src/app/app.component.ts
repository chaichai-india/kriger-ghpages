import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
// import { LoginService } from './services/authentication/login.service';
// import { SeoService } from './services/seo/seo.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kriger-campus-website';

  constructor(private authService: AuthService) {
    // seo.setMetaTags();
  }

  logoutIfLogin() {
    this.authService.isLoggedInPromise().then(user => {
      if (user) {
        const { email } = user;
        if (email === 'ashish@kriger.in') {
          this.authService.signout();
        }
      }
    });
  }

  // async login() {
  //   await this.loginService.loginIfNotAuth();
  // }

  ngOnInit() {
    // this.login().then(() => console.log('logged In'));
    localStorage.setItem('user', null);
    this.logoutIfLogin();
  }
}
