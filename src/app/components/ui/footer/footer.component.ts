import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('hideFooter', [
      state(
        'initial',
        style({
          opacity: '1'
        })
      ),
      state(
        'final',
        style({
          opacity: '0'
        })
      ),
      transition('initial<=>final', animate('500ms'))
    ]),
    trigger('showFooter', [
      state(
        'initial',
        style({
          display: 'none',
          opacity: '0'
        })
      ),
      state(
        'final',
        style({
          display: 'block',
          opacity: '1'
        })
      ),
      transition('initial => final', animate('1000ms')),
      transition('final => initial', animate('300ms'))
    ])
  ]
})
export class FooterComponent implements OnInit {
  currentState = 'initial';
  toggleFooter() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
  constructor() {}

  ngOnInit() {}
}
