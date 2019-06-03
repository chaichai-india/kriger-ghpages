import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuth = this.authService.isLoggedIn();
  // user = {
  //   email: 'ashish@kriger.in',
  //   password: '123456'
  // };

  // async loginIfNotAuth() {
  //   if (!this.isAuth) {
  //     await this.signin();
  //   }
  // }

  // async signin() {
  //   const { email, password } = this.user;
  //   return await this.authService.login(email, password).then(() => {
  //     // console.log('auth status ' + this.authService.isLoggedIn)
  //   });
  // }
  constructor(private authService: AuthService) {}
}
