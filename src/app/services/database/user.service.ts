// import { Injectable } from "@angular/core";
// import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

// import { Observable, Subscription } from "rxjs";
// import { map, tap } from "rxjs/operators";

// import { UserDetail } from "../../models/user/user-detail.model";

// @Injectable({
//   providedIn: "root"
// })
// export class UserService {
//   userRef: AngularFireList<any>;
//   userSub: Subscription;
//   userList: Observable<any[]>;

//   async getUsers() {
//     // await this.loginService.loginIfNotAuth();
//     this.userRef = this.db.list(`/User_Detail`, ref => ref.orderByKey());

//     try {
//       this.userList = this.userRef.snapshotChanges().pipe(
//         // tap(users => console.log(`fetch ${users.length} users`)),
//         map(users =>
//           users.map(user => {
//             return {
//               key: user.payload.key,
//               ...user.payload.val()
//             };
//           })
//         )
//       );
//     } catch (err) {
//       throw new Error("Users fetch failed!");
//     }

//     return await this.userList;
//   }

//   async getUserDetail(uid: string) {
//     // await this.loginService.loginIfNotAuth();
//     return await this.db.object(`/User_Detail/${uid}`).valueChanges();
//   }

//   async setNewUserData(uid, data) {
//     const userRef = this.db.database.ref("/User").child(uid);
//     const userDetailRef = this.db.database.ref("/User_Detail").child(uid);
//     const userExtraDetailRef = this.db.database
//       .ref("/User_Extra_Detail")
//       .child(uid);

//     const { email, password, contact, current_city } = data;
//     const userData = { email, password, contact, current_city };
//     const { type, first_name, last_name, name } = data;
//     const userDetailData = { type, first_name, last_name, name };
//     const { date_of_joining } = data;
//     const userExtraDetailData = { date_of_joining };
//     try {
//       const userPromise = userRef.set(userData);
//       const userDetailPromise = userDetailRef.set(userDetailData);
//       const userExtraDetailPromise = userExtraDetailRef.set(
//         userExtraDetailData
//       );

//       const promise = await Promise.all([
//         userPromise,
//         userDetailPromise,
//         userExtraDetailPromise
//       ]);
//       return promise;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   constructor(private db: AngularFireDatabase) {}
// }
