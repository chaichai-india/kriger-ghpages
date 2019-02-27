import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro-card',
  templateUrl: './intro-card.component.html',
  styleUrls: ['./intro-card.component.css']
})
export class IntroCardComponent implements OnInit {
  dismiss(e: any, t: any) {
    let trigger: boolean =
      e.target.className == 'container' || e.target.className == 'close';
    if (trigger) {
      t.style.display = 'none';
      document.querySelector('body').style.overflowY = 'auto';
    }
  }
  constructor() {}

  ngOnInit() {
    document.querySelector('body').style.overflowY = 'hidden';
  }
}
