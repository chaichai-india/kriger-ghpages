import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../../post/components/post/post.component';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
  isLoggedIn: boolean;
  isLoggedInObservable;
  constructor(private authService: AuthService, public dialog: MatDialog) {}

  setLoggedIn() {
    // this.authService.isLoggedIn().then(user => {
    //   this.isLoggedIn = user ? true : false;
    // });

    this.isLoggedInObservable = this.authService.isLoggedInObservable();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.setLoggedIn();
  }
}
