import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  ref = this.db.database.ref();
  detailRef = this.ref.child('User_Detail');
  counterRef = this.ref.child('User_Counter');
  userRef = this.ref.child('User');

  getDetails(key: string) {
    return this.detailRef.child(key).once('value');
  }

  getCounter(key: string) {
    return this.counterRef
      .child(key)
      .once('value')
      .then(snap => {
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
      });
  }

  getUserDetails(key: string) {
    return this.userRef
      .child(key)
      .once('value')
      .then(snap => {
        let data = snap.val();
        const { country, hometown, state, summary } = data;
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
      });
  }

  constructor(private db: AngularFireDatabase) {}
}
