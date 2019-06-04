import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  async login(email: string, password: string) {
    try {
      await this.afauth.auth
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          // console.log('auth success');
        })
        .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    } catch (e) {
      throw new Error('auth failed');
    }
  }

  isLoggedIn() {
    return this.afauth.authState.pipe(first()).toPromise();
  }

  isLoggedInObservable() {
    return this.afauth.authState.pipe(first());
  }

  signout() {
    this.afauth.auth.signOut();
  }

  // getCurrentUser() {
  //   return new Promise<any>((resolve, reject) => {
  //     var user = firebase.auth().onAuthStateChanged(function(user) {
  //       if (user) {
  //         resolve(user);
  //       } else {
  //         reject('No user logged in');
  //       }
  //     });
  //   });
  // }

  constructor(public afauth: AngularFireAuth) {
    // this.afauth.authState.subscribe(user => {
    //   if (user) {
    //     this.user = user;
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // });
  }
}
