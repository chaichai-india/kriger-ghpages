import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { of } from 'rxjs/add/observable/of'

@Component({
  selector: 'app-profile-sort',
  templateUrl: './profile-sort.component.html',
  styleUrls: ['./profile-sort.component.css']
})
export class ProfileSortComponent implements OnInit {
  letters = 'abcdefghijklmopqrstuvwxyz#'.toUpperCase().split('');
  selected = 'A';

  @Output() messageEvent = new EventEmitter<string>();

  sendChange(letter: string) {
    this.messageEvent.emit(this.selected);
    console.log(letter);
  }
  constructor() {}

  ngOnInit() {}
}
