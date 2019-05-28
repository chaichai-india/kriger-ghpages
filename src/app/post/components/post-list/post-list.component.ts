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

  async getPosts(batch: number) {
    return this.postService.getPosts(batch);
  }

  initialize() {
    this.resetValues();
    this.getPosts(5).then(posts => {
      this.setValues(posts);
    });
  }

  private getPosts2(key?) {
    this.postService.getPosts(5).then(res => {
      res.pipe(
        tap(post => {
          /// set the lastKey in preparation for next query
          this.lastKey = post[0].key;
          const newMovies = post.slice(0, 5);

          /// Get current movies in BehaviorSubject
          const currentMovies = this.posts2.getValue();

          /// If data is identical, stop making queries

          /// Concatenate new movies to current movies
          this.posts2.next(currentMovies.concat(newMovies));
        })
      );
    });
  }

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.initialize();
  }
}
