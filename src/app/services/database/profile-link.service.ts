// import { Injectable } from "@angular/core";
// import { AngularFireDatabase } from "@angular/fire/database";
// // import { LoginService } from '../authentication/login.service';

// @Injectable({
//   providedIn: "root"
// })
// export class ProfileLinkService {
//   ref = this.db.database.ref().child("User_Profile_Link");

//   getProfileLink(key: string) {
//     return this.ref.child(key).once("value");
//   }

//   async isProfileLink(name: string) {
//     return this.ref
//       .orderByValue()
//       .equalTo(name)
//       .once("value")
//       .then(snap => {
//         if (snap.exists()) {
//           let data = snap.val();
//           let key = Object.keys(data)[0];
//           let username = data[key];
//           // console.log(key, data[key]);
//           return { key, username };
//         } else {
//           return false;
//         }
//       });

//     // return this.ref
//     //   .orderByKey()
//     //   .once("value")
//     //   .then(snap => {
//     //     let data = snap.val();
//     //     let response: any = false;
//     //     for (const key in data) {
//     //       if (data.hasOwnProperty(key)) {
//     //         const username = data[key];
//     //         if (username === name) {
//     //           response = { key, username };
//     //           break;
//     //         }
//     //       }
//     //     }
//     //     return response;
//     //   });
//   }
//   constructor(private db: AngularFireDatabase) {}
// }
