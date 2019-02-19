import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';

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

  constructor(db: AngularFireDatabase, private authService: AuthService) {
    authService.login(this.user.email, this.user.password).then(() => {
      this.posts = db
        .list('/Post', ref => ref.orderByChild('timestamp').limitToLast(20))
        .valueChanges();
      console.log('login success');
    });
  }

  ngOnInit() {
    if (!this.visitCount) {
      localStorage.setItem('visitCount', '1');
    } else {
      this.visitCount++;
      localStorage.setItem('visitCount', this.visitCount.toString());
    }
    console.log(this.visitCount, this.showIntro);
  }
}
