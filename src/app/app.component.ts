import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kriger-campus-website';
  visitCount: number = +localStorage.getItem('visitCount');
  showIntro: boolean = this.visitCount == 0 || this.visitCount % 20 == 0;

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
