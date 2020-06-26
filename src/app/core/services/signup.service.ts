import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class SignupService {
  constructor(
    private afauth: AngularFireAuth,
    private apiService: ApiService
  ) {}

  async firebaseSignup(data) {
    const { email, password } = data;
    let response = "Something went wrong!!";
    let success = false;
    let uid;
    try {
      const userCredential = await this.afauth.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await userCredential.user.sendEmailVerification();
      uid = userCredential.user.uid;
      success = true;
      response =
        "Kindly check your mail for verification email.\n" +
        "Link is valid for 15 minutes.\n\n" +
        "If you don't see the mail in your inbox, please check your spam or junk folder.";

      await this.afauth.auth.signOut();
    } catch (error) {
      const { code, message } = error;
      if (code === "auth/email-already-in-use") {
        response = "There's already an account linked to this Email.";
      }
      if (code === "auth/invalid-email") {
        response = "The email is invalid.";
      }
      console.log({ signupError: error });
    }

    return { response, success, uid };
  }

  SendVerificationMail() {
    const user = this.afauth.auth.currentUser;
    return user.sendEmailVerification();
  }

  checkUsernameAvailability(username) {
    const path = `auth/validate/username/${username}`;
    return this.apiService.get({ path });
  }

  serverSignup(body) {
    const path = `auth/signup`;
    return this.apiService.post({ path, body });
  }
}
