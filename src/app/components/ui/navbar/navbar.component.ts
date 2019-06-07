import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../../../post/components/post/post.component';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
  isLoggedIn: boolean;
  isLoggedInObservable;
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  setLoggedIn() {
    // this.authService.isLoggedIn().then(user => {
    //   this.isLoggedIn = user ? true : false;
    // });

    this.authService.loggedInUpdateObservable().then(status => {
      this.isLoggedInObservable = status;
    });
  }

  async logout() {
    await this.authService.signout();
    this.openSnackBar('Success!', 'Logged Out');
    this.router.navigate(['/']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'success-dialog'
    });
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
