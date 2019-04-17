import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/database/user.service';
import { Subscription, Observable, of } from 'rxjs';
import { ElasticSearchService } from 'src/app/services/database/elastic-search.service';
import { ProfileLinkService } from 'src/app/services/database/profile-link.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit, OnDestroy {
  selected: string = 'A';
  clicked: any;
  filteredList: any[];
  data: boolean;
  loading: boolean;
  total: number;
  pagination: any[];

  resetValues() {
    this.loading = true;
    this.filteredList = [];
    this.data = false;
    this.total = 0;
    this.pagination = [];
    this.clicked = this.clicked > 1 ? this.clicked : 1;
    this.chRef.detectChanges();
  }

  setValues(data: any[], total: number) {
    this.filteredList = data;
    this.total = total;
    this.data = true;
    this.loading = false;
    this.pagination = this.paginationCounter(total);
    this.chRef.detectChanges();
  }

  paginationCounter(total: number, size: number = 10) {
    let n = total / size;
    let r = total % size;
    let a = Math.floor(n);
    let pages = r === 0 ? a : a + 1;
    return new Array(pages);
  }

  getNext(i) {
    if (i == this.clicked) return;
    this.clicked = +i;
    this.chRef.detectChanges();
    let from = (this.clicked - 1) * 10;
    this.filterByLetter(from);
  }

  receiveSelected($event) {
    if ($event == this.selected) return;
    this.selected = $event;
    this.clicked = 1;
    this.filterByLetter();
  }

  async filterByLetter(from: number = 0) {
    this.resetValues();
    this.es.getUsersByStartChar(this.selected, from, res => {
      // console.log(res.hits);
      if (res.hits) {
        let data: any[] = res.hits;
        console.log(
          'TCL: ProfileListComponent -> filterByLetter -> data',
          data
        );
        let dataList: any[] = [];
        data.forEach(el => {
          const { _id } = el;
          const { name } = el._source;
          dataList.push({ _id, name });
        });
        this.setValues(dataList, res.total);
        console.log(
          'TCL: ProfileListComponent -> filterByLetter -> this.filteredList',
          this.filteredList
        );
      } else {
        this.loading = false;
        this.chRef.detectChanges();
        this.data = false;
        this.chRef.detectChanges();
      }
    });
  }

  profileLink(key: string) {
    this.profileService.getProfileLink(key).then(snap => {
      console.log(
        'TCL: ProfileListComponent -> profileLink -> snap',
        snap.val()
      );
    });
  }

  constructor(
    private es: ElasticSearchService,
    private profileService: ProfileLinkService,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.filterByLetter();
  }

  ngOnDestroy() {}
}
