import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  loggedInUpdate = new BehaviorSubject<boolean>(false);

  async login(email: string, password: string) {
    try {
      await this.afauth.auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log('auth success');
          this.loggedInUpdate.next(true);
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

  isLoggedInPromise() {
    return this.afauth.authState.pipe(first()).toPromise();
  }

  isLoggedIn() {
    this.isLoggedInPromise().then(user => {
      this.loggedInUpdate.next(user ? true : false);
    });
  }

  async loggedInUpdateObservable() {
    await this.isLoggedIn();
    return this.loggedInUpdate.asObservable();
  }

  // isLoggedInObservable() {
  //   return this.afauth.authState.pipe(first());
  // }

  signout() {
    this.afauth.auth.signOut();
    this.loggedInUpdate.next(false);
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