import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { of } from 'rxjs/add/observable/of'

@Component({
  selector: 'app-profile-sort',
  templateUrl: './profile-sort.component.html',
  styleUrls: ['./profile-sort.component.css']
})
export class ProfileSortComponent implements OnInit {
  letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  selected: string = 'A';

  @Output() messageEvent = new EventEmitter<string>();
  @Input() total: number;

  sendChange(letter: string) {
    this.selected = letter;
    this.messageEvent.emit(letter);
    // console.log(letter);
  }
  constructor() {}

  ngOnInit() {}
}
