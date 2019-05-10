import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
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
          opacity: '1',
          display: 'grid'
        })
      ),
      state(
        'final',
        style({
          opacity: '0',
          display: 'none'
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
  innerWidth: any;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      // you're at the bottom of the page
      this.currentState = 'final';
    }
  }

  toggleFooter() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  constructor(public el: ElementRef) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 916) {
      this.currentState = 'final';
    }
    console.log(
      'TCL: FooterComponent -> ngOnInit -> this.innerWidth',
      this.innerWidth
    );
  }
}
