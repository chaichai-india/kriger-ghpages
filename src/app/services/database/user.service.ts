import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserDetail } from '../../models/user/user-detail.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // userRef: AngularFireList<any>;

  async getUserDetail(uid: string) {
    return this.db
      .object(`/User_Detail/${uid}`)
      .valueChanges()
      .subscribe(data => console.log(data));
  }

  constructor(private db: AngularFireDatabase) {}
}
