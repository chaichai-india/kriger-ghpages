import { Component, OnInit } from '@angular/core';
import {
  MENTORS,
  ADVISORS,
  EXPERTS,
  CORETEAM,
  TECHNICALTEAM
} from './ourteam-data';

@Component({
  selector: 'app-ourteam',
  templateUrl: './ourteam.component.html',
  styleUrls: ['./ourteam.component.css']
})
export class OurteamComponent implements OnInit {
  mentors = MENTORS;
  advisors = ADVISORS;
  experts = EXPERTS;
  coreteam = CORETEAM;
  technicalteam = TECHNICALTEAM;
  constructor() {}

  ngOnInit() {}
}
