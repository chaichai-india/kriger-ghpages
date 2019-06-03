import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/authentication/login.service';
// import { SeoService } from './services/seo/seo.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kriger-campus-website';

  // visitCount: number = +localStorage.getItem('visitCount');
  // showIntro: boolean = this.visitCount == 0 || this.visitCount % 20 == 0;

  constructor(private loginService: LoginService) {
    // seo.setMetaTags();
  }

  async login() {
    await this.loginService.loginIfNotAuth();
  }

  ngOnInit() {
    // this.login().then(() => console.log('logged In'));
  }
}
