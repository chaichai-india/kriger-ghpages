import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';
import { PostService } from './services/database/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kriger-campus-website';
  visitCount: number = +localStorage.getItem('visitCount');
  showIntro: boolean = this.visitCount == 0 || this.visitCount % 20 == 0;

  posts: Observable<any[]>;
  user = {
    email: 'ashish@kriger.in',
    password: '123456'
  };

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {
    if (!this.visitCount) {
      localStorage.setItem('visitCount', '1');
    } else {
      this.visitCount++;
      localStorage.setItem('visitCount', this.visitCount.toString());
    }
    console.log(this.visitCount, this.showIntro);

    this.authService.login(this.user.email, this.user.password).then(() => {
      this.postService.getPosts('timestamp', 20).then(response => {
        this.posts = response;
      });
    });
  }
}
