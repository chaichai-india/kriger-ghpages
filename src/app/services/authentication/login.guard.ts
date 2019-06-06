import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.isLoggedInPromise().then(
        user => {
          if (!user) {
            return resolve(true);
          } else {
            this.router.navigate(['/']);
            return resolve(true);
          }
        },
        err => {
          this.router.navigate(['/']);
          return resolve(true);
        }
      );
    });
  }
}
