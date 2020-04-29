// import { Injectable } from "@angular/core";
// import { AngularFireDatabase } from "@angular/fire/database";

// @Injectable({
//   providedIn: "root"
// })
// export class CorporateService {
//   ref = this.db.database.ref().child("Corporate_Name");

//   constructor(private db: AngularFireDatabase) {}

//   getCorporateName(value: number) {
//     return this.ref
//       .orderByChild("value")
//       .equalTo(value)
//       .once("value")
//       .then(snap => {
//         if (snap.exists()) {
//           const lastEntry = snap.val();
//           const lastEntryKey = lastEntry ? Object.keys(lastEntry)[0] : false;
//           const name = lastEntryKey ? lastEntry[lastEntryKey].name : "0";
//           return name;
//         } else {
//           return false;
//         }
//       });
//   }
// }
