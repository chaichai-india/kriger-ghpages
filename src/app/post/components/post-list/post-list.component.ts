import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  Observable,
  forkJoin,
  combineLatest,
  BehaviorSubject,
  Subject
} from 'rxjs';
import { map, concat, take, tap } from 'rxjs/operators';

import { PostService } from '../../../services/database/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<any[]>;
  posts2 = new BehaviorSubject([]);
  isAuth: boolean;
  lastKey: string;
  loading: boolean;
  infinite: boolean = false;

  @ViewChild('loadbtn', { read: ElementRef }) public laodbtn: ElementRef<any>;

  resetValues() {
    this.loading = true;
    // console.log(
    // 'TCL: PostListComponent -> resetValues -> this.loading',
    // this.loading
    // );
  }

  setValues(data) {
    this.posts = data;
    data.pipe(take(1)).subscribe(() => {
      this.loading = false;
      // console.log(
      // 'TCL: PostListComponent -> setValues -> this.loading',
      // this.loading
      // );
    });
  }

  nextBatch() {
    let scrollPos = window.scrollY;
    // console.log(scrollPos);
    this.lastKey = this.postService.lastkey;
    // console.log(this.lastKey);
    this.postService.getPosts(5, this.lastKey).then(res => {
      this.posts = combineLatest(res, this.posts).pipe(
        map(([next, prev]) => {
          // console.log(next, prev);
          next.pop();
          let posts = next.concat(prev);
          return posts;
        })
      );

      setTimeout(() => {
        window.scrollTo(0, scrollPos + 200);
      }, 500);
    });
  }

  nextBatch2() {
    this.getPosts2();
  }

  async getPosts(batch: number) {
    return this.postService.getPosts(batch);
  }

  initialize() {
    this.resetValues();
    this.getPosts2();
    // this.getPosts(5).then(posts => {
    //   this.setValues(posts);
    // });
  }

  private getPosts2(key?) {
    this.postService.getPosts(6, this.lastKey).then(res => {
      console.log('TCL: PostListComponent -> res', res);
      res
        .pipe(
          tap(post => {
            console.log('TCL: PostListComponent -> post', post);
            /// set the lastKey in preparation for next query
            this.lastKey = post[0].key;
            console.log('TCL: PostListComponent -> lastKey', this.lastKey);
            const newPosts = post.slice(1, 6);
            console.log('TCL: PostListComponent -> newPosts', newPosts);

            /// Get current Posts in BehaviorSubject
            let currentPosts = this.posts2.getValue();
            console.log('TCL: PostListComponent -> currentPosts', currentPosts);

            /// If data is identical, stop making queries
            if (!this.infinite) {
              currentPosts = currentPosts.reverse();
            }
            /// Concatenate new Posts to current Posts
            this.posts2.next([...currentPosts, ...newPosts.reverse()]);
            this.infinite = true;
            console.log('TCL: PostListComponent -> this.posts2', this.posts2);
          }),
          take(1)
        )
        .subscribe();
    });
  }

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.initialize();
  }
}
