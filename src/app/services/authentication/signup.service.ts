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

  async signup(data) {
    const { email, password } = data;
    let response;
    await this.afauth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        // returns a new user and signs in automatically
        console.log("Success!", value);
        await this.SendVerificationMail(data).then(() => {
          // alert(
          //   "Kindly check your mail for verification email.\n" +
          //     "Link is valid for 15 minutes.\n\n" +
          //     "If you don't see the mail in your inbox, please check your spam or junk folder."
          // );
          response =
            "Kindly check your mail for verification email.\n" +
            "Link is valid for 15 minutes.\n\n" +
            "If you don't see the mail in your inbox, please check your spam or junk folder.";
        });
      })
      .catch(err => {
        console.log("Something went wrong!", err.message);
        // alert(err.message);
        response = err.message;
      });
    return response;
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail(data) {
    const user = this.afauth.auth.currentUser;
    const uid = user.uid;
    await this.userService.setNewUserData(uid, data).then(async () => {
      console.log("new user data added");
      await user.sendEmailVerification().then(async () => {
        console.log("Email Verification Sent");
      });
      await this.afauth.auth.signOut();
      console.log("signedout");
    });
  }
}
