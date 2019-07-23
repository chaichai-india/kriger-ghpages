import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { ElasticSearchService } from '../../../services/database/elastic-search.service';
import { ProfileLinkService } from '../../../services/database/profile-link.service';
import { Router } from '@angular/router';

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
        // console.log(
        // 'TCL: ProfileListComponent -> filterByLetter -> data',
        // data
        // );
        let dataList: any[] = [];
        data.forEach(el => {
          const { _id } = el;
          const { name } = el._source;
          dataList.push({ _id, name });
        });
        this.setValues(dataList, res.total);
        // console.log(
        // 'TCL: ProfileListComponent -> filterByLetter -> this.filteredList',
        // this.filteredList
        // );
      } else {
        this.loading = false;
        this.chRef.detectChanges();
        this.data = false;
        this.chRef.detectChanges();
      }
    });
  }

  profileLink(key: string) {
    this.profileLinkService.getProfileLink(key).then(snap => {
      let username = snap.val();
      // console.log(
      // 'TCL: ProfileListComponent -> profileLink -> username',
      // username
      // );
      this.zone.run(() => {
        this.router.navigate([`/india/${username}`]);
      });
    });
  }

  constructor(
    private es: ElasticSearchService,
    private profileLinkService: ProfileLinkService,
    private router: Router,
    private zone: NgZone,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.filterByLetter();
  }

  ngOnDestroy() {}
}
