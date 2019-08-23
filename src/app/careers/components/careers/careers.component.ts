import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  indeedUrl;
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getTrustedUrl(
      'https://www.indeedjobs.com/kriger-campus-indias-education-network'
    );
  }

  getTrustedUrl(url: any) {
    this.indeedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
