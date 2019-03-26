import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserDetail } from '../../models/user/user-detail.model';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRef: AngularFireList<any>;
  userSub: Subscription;
  userList: Observable<any[]>;

  async getUsers() {
    await this.loginService.loginIfNotAuth();
    this.userRef = this.db.list(`/User_Detail`, ref => ref.orderByKey());

    try {
      this.userList = this.userRef.snapshotChanges().pipe(
        tap(users => console.log(`fetch ${users.length} users`)),
        map(users =>
          users.map(user => {
            return {
              key: user.payload.key,
              ...user.payload.val()
            };
          })
        )
      );
    } catch (err) {
      throw new Error('Users fetch failed!');
    }

    return await this.userList;
  }

  async getUserDetail(uid: string) {
    await this.loginService.loginIfNotAuth();
    return await this.db.object(`/User_Detail/${uid}`).valueChanges();
  }

  constructor(
    private db: AngularFireDatabase,
    private loginService: LoginService
  ) {}
}
