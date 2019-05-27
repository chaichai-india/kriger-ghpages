import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private titleService: Title, private metaTagService: Meta) {}

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
