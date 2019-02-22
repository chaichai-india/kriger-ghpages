import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PostService } from '../../services/database/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<any[]>;
  authUser: boolean;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authUser = this.authService.isLoggedIn;
    if (this.authUser) {
      this.postService.getPosts('timestamp', 20).then(response => {
        this.posts = response;
      });
    } else {
      console.log('auth failure');
    }
  }
}
