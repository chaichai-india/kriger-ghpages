import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adbanner',
  templateUrl: './adbanner.component.html',
  styleUrls: ['./adbanner.component.css']
})
export class AdbannerComponent implements OnInit {
  @Input() public imgSrc: string;
  @Input() public adLink: string;

  constructor() {}

  ngOnInit() {}
}
