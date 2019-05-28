import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TAGS } from './seo_tags';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private titleService: Title, private metaTagService: Meta) {}

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  setMetaTags() {
    let tags = '';
    TAGS.forEach(tag => (tags += `${tag},`));

    console.log('TCL: SeoService -> setMetaTags -> tags', tags);
    this.metaTagService.addTag({ name: 'keyword', content: tags });
  }
}
