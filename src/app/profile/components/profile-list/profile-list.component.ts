import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/database/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit, OnDestroy {
  selected: string = 'A';
  userSub: Subscription;
  userList: any[];
  filteredList: any[] = [{ name: 'Ashish' }, { name: 'Wren' }];

  receiveSelected($event) {
    this.selected = $event;
    // this.filterByLetter();
  }

  async filterByLetter() {
    let list = await this.userList;
    this.filteredList = list.filter(user => {
      if (user.name) {
        let name: string = user.name;
        return name.toUpperCase().substr(0, 1) === this.selected;
      } else {
        return false;
      }
    });
  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.userService.getUsers().then(res => {
    //   this.userSub = res.subscribe(val => {
    //     this.userList = val;
    //     this.filterByLetter();
    //   });
    // });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
