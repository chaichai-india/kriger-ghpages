import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProfileLinkService {
  ref = this.db.database.ref().child('User_Profile_Link');

  getProfileLink(key: string) {
    return this.ref
      .orderByKey()
      .equalTo(key)
      .once('value');
  }
  constructor(private db: AngularFireDatabase) {}
}
