import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { of } from 'rxjs/add/observable/of'

@Component({
  selector: 'app-profile-sort',
  templateUrl: './profile-sort.component.html',
  styleUrls: ['./profile-sort.component.css']
})
export class ProfileSortComponent implements OnInit {
  sort_list = 'abcdefghijklmopqrstuvwxyz#'.toUpperCase().split('');
  selected = 'A';

  @Output() messageEvent = new EventEmitter<string>();

  sendChange() {
    this.messageEvent.emit(this.selected);
  }
  constructor() {}

  ngOnInit() {}
}
