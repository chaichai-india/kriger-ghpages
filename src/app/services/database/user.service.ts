import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { UserDetail } from '../../models/user/user-detail.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // userRef: AngularFireList<any>;
  userDetail: {};

  async getUserDetail(uid: string) {
    return uid; // continues....
  }

  constructor(private db: AngularFireDatabase) {}
}
