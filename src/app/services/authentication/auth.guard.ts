import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.isLoggedIn().then(
        user => {
          if (user) {
            return resolve(true);
          } else {
            this.router.navigate(['/login']);
            return resolve(true);
          }
        },
        err => {
          this.router.navigate(['/login']);
          return resolve(true);
        }
      );
    });
  }
}
