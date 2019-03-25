import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/database/user.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  selected: string = 'A';

  receiveSelected($event) {
    this.selected = $event;
  }
  constructor(userService: UserService) {}

  ngOnInit() {}
}
