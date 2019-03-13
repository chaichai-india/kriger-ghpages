import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsRef: AngularFireList<any>;
  posts: Observable<any[]>;

  async getPosts(orderby: string, batch?: number) {
    this.postsRef = this.db.list('/Post', ref =>
      ref.orderByChild(orderby).limitToLast(batch)
    );
    // ref.orderByChild('uid').equalTo('DAqhLs3rLqh4hTdppkTqJYpmPMJ3') --editors all posts
    // Use snapshotChanges().map() to store the key
    try {
      this.posts = this.postsRef.snapshotChanges().pipe(
        tap(
          changes => console.log(`read ${changes.length} posts`),
          shareReplay(1)
        ),
        map(changes =>
          changes.map(c => {
            let userdetail = this.db
              .object(`/User_Detail/${c.payload.val().uid}`)
              .valueChanges()
              .pipe(
                tap(user => console.log(`read user`)),
                shareReplay(1)
              );
            let postCounter = this.db
              .object(`/Post_Counter/${c.payload.key}`)
              .valueChanges()
              .pipe(
                tap(counter => console.log(`read post counter`)),
                shareReplay(1)
              );
            return {
              userdetail,
              counter: postCounter,
              key: c.payload.key,
              ...c.payload.val()
            };
          })
        )
      );
    } catch (err) {
      throw new Error('Posts fetch failed');
    }
    return this.posts;
  }

  getPost(id: string) {
    return this.db
      .object(`/Post/${id}`)
      .snapshotChanges()
      .pipe(
        map(post => {
          return {
            key: post.payload.key,
            ...post.payload.val()
          };
        })
      );
  }

  constructor(private db: AngularFireDatabase) {}
}
