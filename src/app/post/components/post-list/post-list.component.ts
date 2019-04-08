import { Component, OnInit } from '@angular/core';
import { Observable, concat } from 'rxjs';

import { PostService } from '../../../services/database/post.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<any[]>;
  isAuth: boolean;
  lastKey: string;

  nextBatch() {
    this.lastKey = this.postService.lastkey;
    console.log(this.lastKey);
    this.postService.getPosts(5, this.lastKey).then(res => {
      this.posts = concat(this.posts, res);
    });
  }

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
    // console.log(`isAuth at post list = ${this.isAuth}`);

    this.postService.getPosts(5).then(res => {
      this.posts = res;
    });
  }
}
