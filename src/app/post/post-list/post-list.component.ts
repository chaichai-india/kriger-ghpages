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
  isAuth: boolean;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.isAuth = this.authService.isLoggedIn;
    console.log(`isAuth = ${this.isAuth}`);
    if (this.isAuth) {
      this.postService.getPosts(5).then(res => {
        this.posts = res;
      });
    } else {
      this.loginService.signin().then(() => {
        this.postService.getPosts(5).then(res => {
          this.posts = res;
        });
      });
    }
  }
}
