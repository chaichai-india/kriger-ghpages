import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "../database/user.service";

@Injectable({
  providedIn: "root"
})
export class SignupService {
  constructor(
    private afauth: AngularFireAuth,
    private userService: UserService
  ) {}

  signup(data) {
    const { email, password } = data;
    this.afauth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log("Success!", value);
        this.SendVerificationMail(data).then(() => {
          alert(
            "Kindly check your mail for verification email.\n" +
              "Link is valid for 15 minutes.\n\n" +
              "If you don't see the mail in your inbox, please check your spam or junk folder."
          );
        });
      })
      .catch(err => {
        console.log("Something went wrong!", err.message);
        alert(err.message);
      });
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail(data) {
    const user = this.afauth.auth.currentUser;
    const uid = user.uid;
    return this.userService.setNewUserData(uid, data).then(() => {
      console.log("new user data added");
      user.sendEmailVerification().then(() => {
        console.log("Email Verification Sent");
        this.afauth.auth.signOut();
      });
    });
  }
}
