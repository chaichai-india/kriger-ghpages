import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { first } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { SignupService } from "./signup.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User;
  loggedInUpdate = new BehaviorSubject<boolean>(false);

  async login(email: string, password: string) {
    let response = { message: "Failed!!", action: "OH NO" };
    try {
      await this.afauth.auth
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          if (res.user.emailVerified) {
            response = { message: "Success!", action: "Logged In" };
            this.loggedInUpdate.next(true);
          } else {
            await this.SendVerificationMail();
            // alert(
            //   "Your email is not verified!\n" +
            //     "Kindly check your mail for verification email.\n"
            // );
            response = {
              message:
                "Email not verified!\n" +
                "Kindly check your mail for verification email.",
              action: "Please Verify",
            };
          }
        })
        .catch(function (error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          // console.log(errorCode, errorMessage);
          if (errorCode === "auth/wrong-password") {
            response = { message: "Wrong Password!", action: "OH NO" };
            // alert("Wrong password.");
          } else if (errorCode === "auth/user-not-found") {
            response = { message: "No user found!", action: "Error" };
            // alert(errorMessage);
          } else {
            response = { message: "Something went wrong! \n", action: "Error" };
          }
          // console.log(error);
        });
    } catch (e) {
      response = { message: "Failed!!", action: "OH NO" };
      // throw new Error("auth failed");
    }

    return response;
  }

  async signInAndVerifyMail(email, password) {
    let response;
    await this.afauth.auth
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        await this.SendVerificationMail();
        response = "Verification mail sent.";
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          response = "No user found!";
        } else if (err.code === "auth/wrong-password") {
          response = "Wrong password!";
        } else {
          response = "Something went wrong!";
        }
      });
    return response;
  }

  async SendVerificationMail() {
    const user = this.afauth.auth.currentUser;
    user.sendEmailVerification().then(async () => {
      // console.log("Email Verification Sent");
      await this.signout();
      // console.log("signedout");
    });
  }

  async sendPasswordResetMail(email) {
    let response: string;
    await this.afauth.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // console.log("password reset email");
        response = "Success";
      })
      .catch((err) => {
        // console.log("error in sending password reset email", err.code);
        if (err.code === "auth/user-not-found") {
          response = "No user found!";
        } else {
          response = "Something went wrong!";
        }
      });
    return response;
  }

  isLoggedInPromise() {
    return this.afauth.authState.pipe(first()).toPromise();
  }

  isLoggedIn() {
    this.isLoggedInPromise().then((user) => {
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

  get userID() {
    if (this.afauth.auth.currentUser) {
      return this.afauth.auth.currentUser.uid;
    }
    return null;
  }

  get userName() {
    return this.afauth.auth.currentUser.displayName;
  }

  getCurrentUser() {
    // return this.afauth.authState.subscribe((user) => user.uid);
    return new Promise<any>((resolve, reject) => {
      this.afauth.authState.subscribe(function (user) {
        if (user) {
          resolve(user.uid);
        } else {
          reject("No user logged in");
        }
      });
    });
    // return await this.afauth.auth.currentUser;
  }

  constructor(public afauth: AngularFireAuth) {
    // this.afauth.authState.subscribe((user) => {
    //   if (user) {
    //     this.user = user;
    //     // localStorage.setItem('user', JSON.stringify(this.user));
    //   }
    // });
  }
}
