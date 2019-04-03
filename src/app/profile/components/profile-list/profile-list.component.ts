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
  filteredList: any[] = [];
  data: boolean = false;
  loading: boolean = true;
  total: number = 0;

  receiveSelected($event) {
    this.selected = $event;
    this.filterByLetter();
  }

  async filterByLetter() {
    this.es.getUsersByStartChar(this.selected, res => {
      console.log(res.hits);
      if (res.hits) {
        let data: any[] = res.hits;
        let dataList: any[] = [];
        data.forEach(el => {
          dataList.push(el._source);
        });
        console.log(this.filteredList);
        this.filteredList = dataList;
        this.total = res.total;
        this.data = true;
        this.loading = false;
        this.chRef.detectChanges();
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
