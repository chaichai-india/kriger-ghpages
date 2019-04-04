import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/database/user.service';
import { Subscription, Observable, of } from 'rxjs';
import { ElasticSearchService } from 'src/app/services/database/elastic-search.service';

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
      console.log(res.hits);
      if (res.hits) {
        let data: any[] = res.hits;
        let dataList: any[] = [];
        data.forEach(el => {
          dataList.push(el._source);
        });
        console.log(this.filteredList);
        this.setValues(dataList, res.total);
        console.log(this.filteredList);
      } else {
        this.loading = false;
        this.chRef.detectChanges();
        this.data = false;
        this.chRef.detectChanges();
      }
    });
  }

  constructor(
    private es: ElasticSearchService,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.filterByLetter();
  }

  ngOnDestroy() {}
}
