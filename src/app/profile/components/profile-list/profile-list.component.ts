import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/database/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  selected: string = 'A';
  userList: Observable<any[]>;

  receiveSelected($event) {
    this.selected = $event;
  }

  filterByLetter(name: string, letter: string) {
    return name.toUpperCase().substr(0, 1) === letter;
  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().then(res => {
      this.userList = res;
    });
  }
}
