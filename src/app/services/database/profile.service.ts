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
    return this.counterRef.child(key).once('value');
  }

  getUserDetails(key: string) {
    return this.userRef.child(key).once('value');
  }

  constructor(private db: AngularFireDatabase) {}
}
