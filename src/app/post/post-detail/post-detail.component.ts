import { Component, OnInit } from '@angular/core';

import { PostService } from '../../services/database/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  id: string;
  isAuth: boolean;
  post;
  constructor(
    private authService: AuthService,
    private postService: PostService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.isAuth = this.authService.isLoggedIn;
    console.log(this.isAuth);

    if (this.isAuth) {
      this.postService.getPost(this.id).then(res => (this.post = res));
      console.log(this.post);
    } else {
      this.loginService.signin().then(() => {
        this.postService.getPost(this.id).then(res => (this.post = res));
        console.log(this.post);
      });
    }
  }
}
