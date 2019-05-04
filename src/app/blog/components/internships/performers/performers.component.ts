import { Component, OnInit } from '@angular/core';
import { PERFORMERS } from './performer-data';

@Component({
  selector: 'app-performers',
  templateUrl: './performers.component.html',
  styleUrls: ['./performers.component.css']
})
export class PerformersComponent implements OnInit {
  performers = PERFORMERS;
  constructor() {}

  ngOnInit() {
    // console.log('TCL: PerformersComponent -> performers', this.performers);
  }
}
