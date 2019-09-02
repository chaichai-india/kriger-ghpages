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

  async getUserDetails1(key: string) {
    const fields = {
      country: undefined,
      hometown: undefined,
      exam: undefined,
      subject: undefined,
      latestedu: undefined,
      state: undefined,
      summary: undefined,
      award: undefined,
      certification: undefined,
      college: undefined,
      coaching: undefined,
      internship: undefined,
      publication: undefined,
      specialisation: undefined
    };

    const promises = [];
    for (const field in fields) {
      if (fields.hasOwnProperty(field)) {
        fields[field] = this.userRef
          .child(key)
          .child(field)
          .once("value");
        promises.push(fields[field]);
      }
    }

    const [
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
    ] = await Promise.all(promises);

    fields.country = country.val() ? country.val() : undefined;
    fields.hometown = hometown.val() ? hometown.val() : undefined;
    fields.exam = exam.val() ? exam.val() : undefined;
    fields.subject = subject.val() ? subject.val() : undefined;
    fields.latestedu = latestedu.val() ? latestedu.val() : undefined;
    fields.state = state.val() ? state.val() : undefined;
    fields.summary = summary.val() ? summary.val() : undefined;
    fields.award = award.val() ? award.val() : undefined;
    fields.certification = certification.val()
      ? certification.val()
      : undefined;
    fields.coaching = coaching.val() ? coaching.val() : undefined;
    fields.college = college.val() ? college.val() : undefined;
    fields.internship = internship.val() ? internship.val() : undefined;
    fields.publication = publication.val() ? publication.val() : undefined;
    fields.specialisation = specialisation.val()
      ? specialisation.val()
      : undefined;

    return fields;
  }
  constructor(private db: AngularFireDatabase) {}
}
