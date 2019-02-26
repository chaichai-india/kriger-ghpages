import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PostService } from '../../services/database/post.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/database/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  user = {
    email: 'ashish@kriger.in',
    password: '123456'
  };
  posts: Observable<any[]>;
  authUser: boolean;
  getUserDetail(uid: string) {
    console.log(uid);
    this.userService.getUserDetail(uid);
  }

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.login(this.user.email, this.user.password).then(() => {
      console.log(this.authService.isLoggedIn);
      this.authUser = this.authService.isLoggedIn;
      if (this.authUser) {
        this.postService.getPosts('timestamp', 20).then(response => {
          response.subscribe(post => console.log(post));
          this.posts = response;
        });
      } else {
        console.log('auth failure');
      }
    });
  }
}
