// import { Injectable } from "@angular/core";
// import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
// import { Observable } from "rxjs";
// import { map, tap, shareReplay } from "rxjs/operators";
// import { ProfileLinkService } from "./profile-link.service";
// // import { AuthService } from "../authentication/auth.service";

// @Injectable({
//   providedIn: "root"
// })
// export class PostService {
//   postsRef: AngularFireList<any>;
//   posts: Observable<any[]>;
//   lastKey: string;

//   get lastkey() {
//     return this.lastKey;
//   }

//   getData(ref: string, itemRef: string) {
//     try {
//       // console.log(ref, itemRef);
//       return this.db
//         .object(`/${ref}/${itemRef}`)
//         .valueChanges()
//         .pipe(
//           // tap(() => console.log(`read ${ref} ${itemRef}`)),
//           shareReplay(1)
//         );
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async getPosts(batch: number = 10, lastKey?: string) {
//     // console.log(`post service auth = ${this.isAuth}`);
//     // await this.loginService.loginIfNotAuth();
//     if (lastKey) {
//       this.postsRef = this.db.list("/Post", ref =>
//         ref
//           .orderByKey()
//           .endAt(lastKey)
//           .limitToLast(batch)
//       );
//     } else {
//       this.postsRef = this.db.list("/Post", ref =>
//         ref.orderByKey().limitToLast(batch)
//       );
//     }

//     // ref.orderByChild('uid').equalTo('DAqhLs3rLqh4hTdppkTqJYpmPMJ3') --editors all posts
//     // Use snapshotChanges().map() to store the key
//     try {
//       this.posts = await this.postsRef.snapshotChanges().pipe(
//         tap(changes => {
//           // console.log(`read ${changes.length} posts`);
//           this.lastKey = changes[0].payload.key;
//           // console.log(this.lastKey);
//         }),
//         shareReplay(1),
//         map(changes =>
//           changes.map(c => {
//             const userRef = "User_Detail";
//             let uid = c.payload.val().uid;
//             let userdetail = this.getData(userRef, uid);
//             // let profileLink = this.profileLinkService.getProfileLink(uid);
//             let profileLink = this.getData("User_Profile_Link", uid);

//             const postCounterRef = "Post_Counter";
//             let key = c.payload.key;
//             let postCounter = this.getData(postCounterRef, key);

//             return {
//               userdetail,
//               profileLink,
//               counter: postCounter,
//               key: c.payload.key,
//               ...c.payload.val()
//             };
//           })
//         )
//       );
//     } catch (err) {
//       throw new Error("Posts fetch failed");
//     }
//     return await this.posts;
//   }

//   async getPost(id: string) {
//     // await this.loginService.loginIfNotAuth();
//     let id_exists = await this.db.database
//       .ref("/Post")
//       .orderByKey()
//       .equalTo(id)
//       .once("value")
//       .then(snapshot => snapshot.exists());
//     // console.log(id_exists);
//     if (id_exists) {
//       return await this.db
//         .object(`/Post/${id}`)
//         .snapshotChanges()
//         .pipe(
//           // tap(() => console.log('post by id called')),
//           map(post => {
//             const userRef = "User_Detail";
//             let payloadValue: any = post.payload.val();
//             // console.log(payloadValue.uid);
//             let uid = payloadValue.uid;
//             let userdetail = this.getData(userRef, uid);
//             // let profileLink = this.profileLinkService.getProfileLink(uid);
//             let profileLink = this.getData("User_Profile_Link", uid);

//             const postCounterRef = "Post_Counter";
//             let key = post.payload.key;
//             let postCounter = this.getData(postCounterRef, key);
//             return {
//               userdetail,
//               profileLink,
//               counter: postCounter,
//               key: post.payload.key,
//               ...post.payload.val()
//             };
//           })
//         );
//     } else {
//       return false;
//     }
//   }

//   async addPost(post) {
//     this.postsRef = this.db.list("/Post");
//     return this.postsRef.push(post);
//   }

//   async addPostImageUrl(url: string, key) {
//     this.postsRef = this.db.list("/Post");
//     return this.postsRef.update(key, { image_url: url });
//   }

//   async addPostPdfUrl(url: string, key) {
//     this.postsRef = this.db.list("/Post");
//     return this.postsRef.update(key, { pdf_url: url });
//   }

//   constructor(
//     private db: AngularFireDatabase,
//     private profileLinkService: ProfileLinkService
//   ) {}
// }
