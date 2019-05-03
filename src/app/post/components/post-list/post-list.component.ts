import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { map, concat, take } from 'rxjs/operators';

import { PostService } from '../../../services/database/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<any[]>;
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
      let joined_posts = combineLatest(res, this.posts).pipe(
        map(([next, prev]) => {
          // console.log(next, prev);
          next.pop();
          let posts = next.concat(prev);
          return posts;
        })
      );
      this.posts = joined_posts;
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

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.initialize();
  }
}
