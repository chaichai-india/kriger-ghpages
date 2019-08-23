import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  ref = this.db.database.ref();
  detailRef = this.ref.child("User_Detail");
  counterRef = this.ref.child("User_Counter");
  userRef = this.ref.child("User");

  getDetails(key: string) {
    return this.detailRef.child(key).once("value");
  }

  getCounter(key: string) {
    return this.counterRef
      .child(key)
      .once("value")
      .then(snap => {
        if (snap.exists()) {
          let data = snap.val();
          const {
            count_posts,
            count_groups,
            count_connections,
            count_profileviews
          } = data;
          return {
            count_posts,
            count_groups,
            count_connections,
            count_profileviews
          };
        } else {
          return Promise.resolve({
            count_posts: 0,
            count_groups: 0,
            count_connections: 0,
            count_profileviews: 0
          });
        }
      });
  }

  getUserDetails(key: string) {
    return this.userRef
      .child(key)
      .once("value")
      .then(snap => {
        if (snap.exists()) {
          let data = snap.val();
          const { country, hometown, state, summary } = data;
          const { exam, subject, latestedu } = data;
          const {
            award,
            certification,
            college,
            coaching,
            internship,
            publication,
            specialisation
          } = data;

          return {
            country,
            hometown,
            exam,
            subject,
            latestedu,
            state,
            summary,
            award,
            certification,
            college,
            coaching,
            internship,
            publication,
            specialisation
          };
        } else {
          return Promise.resolve({
            country: undefined,
            hometown: undefined,
            state: undefined,
            summary: undefined,
            award: undefined,
            certification: undefined,
            college: undefined,
            coaching: undefined,
            internship: undefined,
            publication: undefined,
            specialisation: undefined
          });
        }
      });
  }

  constructor(private db: AngularFireDatabase) {}
}
