import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  indeedUrl: string =
    'https://www.indeedjobs.com/kriger-campus-indias-education-network/_hl/en_US?cpref=JXWAtnzf3XW5aRnY2g_zouV7xMD8uRK8SCWKYC7QXG4';
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
