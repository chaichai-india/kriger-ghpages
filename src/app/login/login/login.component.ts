import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/authentication/auth.service";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from "@angular/material";

// import { AuthProvider } from 'ngx-auth-firebaseui';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  showPassword = false;
  loading = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  get formControls() {
    return this.loginForm.controls;
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  login() {
    this.loading.next(true);
    // console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.isSubmitted = false;
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).then(res => {
      this.loading.next(false);
      const { message, action } = res;
      if (message === "Success!") {
        this.router.navigate(["/posts"]);
      } else {
        this.dialog.open(LoginDialogComponent, { data: { message } });
        this.isSubmitted = false;
      }

      // this.openSnackBar(message, action);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: "success-dialog"
    });
  }

  openForgotPassword() {
    this.dialog.open(ForgotPasswordDialogComponent);
  }
  openHavingTrouble() {
    this.dialog.open(HavingTroubleDialogComponent);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
}

@Component({
  selector: "app-login-dialog",
  templateUrl: "../login-dialog/login-dialog.component.html",
  styleUrls: ["../login-dialog/login-dialog.component.css"]
})
export class LoginDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}

@Component({
  selector: "app-forgot-password-dialog",
  templateUrl:
    "../forgot-password-dialog/forgot-password-dialog.component.html",
  styleUrls: ["../forgot-password-dialog/forgot-password-dialog.component.css"]
})
export class ForgotPasswordDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}

@Component({
  selector: "app-having-trouble-dialog",
  templateUrl: "../having-trouble-dialog/having-trouble-dialog.component.html",
  styleUrls: ["../having-trouble-dialog/having-trouble-dialog.component.css"]
})
export class HavingTroubleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
