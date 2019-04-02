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

  receiveSelected($event) {
    this.selected = $event;
    this.filterByLetter();
  }

  async filterByLetter() {
    {
      // let list = await this.userList;
      // this.filteredList = list.filter(user => {
      //   if (user.name) {
      //     let name: string = user.name;
      //     return name.toUpperCase().substr(0, 1) === this.selected;
      //   } else {
      //     return false;
      //   }
      // });
      // this.filteredList.sort((a, b) => {
      //   let nameA = a.name.toUpperCase();
      //   let nameB = b.name.toUpperCase();
      //   if (nameA < nameB) return -1;
      //   if (nameA > nameB) return 1;
      //   return 0;
      // });
    }
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
        this.data = true;
        this.chRef.detectChanges();
        console.log(this.filteredList);
      } else {
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
    // this.userService.getUsers().then(res => {
    //   this.userSub = res.subscribe(val => {
    //     this.userList = val;
    //     this.filterByLetter();
    //   });
    // });
  }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
  }
}
