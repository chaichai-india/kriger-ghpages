import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PostService } from '../../services/database/post.service';
import { AuthService } from '../../services/auth.service';
import { LoginService } from 'src/app/services/login.service';

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
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.signin().then(() => {
      this.authUser = this.authService.isLoggedIn;
      if (this.authUser) {
        this.postService.getPosts(20).then(res => {
          this.posts = res;
        });
      } else {
        console.log('auth failure');
      }
    });
  }
}
