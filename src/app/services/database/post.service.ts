import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsRef: AngularFireList<any>;
  posts: Observable<any[]>;

  async getPosts(orderby: string, batch: number) {
    this.postsRef = this.db.list('/Post', ref =>
      ref.orderByChild(orderby).limitToLast(batch)
    );
    // // Use snapshotChanges().map() to store the key
    // try {
    //   this.posts = await this.postsRef
    //     .snapshotChanges()
    //     .pipe(
    //       map(changes =>
    //         changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //       )
    //     );
    // } catch (err) {
    //   throw new Error('Posts fetch failed');
    // }
    // return this.posts;
    return this.postsRef.valueChanges();
  }

  constructor(private db: AngularFireDatabase) {}
}
