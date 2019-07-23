import { Component, OnInit, Inject, Renderer2, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/authentication/auth.service";
import { BehaviorSubject } from "rxjs";
import {
  MatSnackBar,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from "@angular/material";

// import { AuthProvider } from 'ngx-auth-firebaseui';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isSubmitted = false;
  showPassword = false;
  loading = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, "body-bg");
  }

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
        // console.log(message);
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400px";
    dialogConfig.minWidth = "300px";
    this.dialog.open(ForgotPasswordDialogComponent, dialogConfig);
  }
  openHavingTrouble() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "400px";
    dialogConfig.minWidth = "300px";
    this.dialog.open(HavingTroubleDialogComponent, dialogConfig);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "body-bg");
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
export class ForgotPasswordDialogComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string;
  isSubmitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  get email() {
    return this.forgotPasswordForm.get("email");
  }

  async sendPasswordReset() {
    this.isSubmitted = true;
    if (this.forgotPasswordForm.invalid) {
      this.isSubmitted = false;
      return;
    }
    const { email } = this.forgotPasswordForm.value;
    await this.authService.sendPasswordResetMail(email).then(res => {
      if (res === "Success") {
        this.message = "Password reset link sent!";
      } else {
        this.message = res;
        this.isSubmitted = false;
      }
    });
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }
}

@Component({
  selector: "app-having-trouble-dialog",
  templateUrl: "../having-trouble-dialog/having-trouble-dialog.component.html",
  styleUrls: ["../having-trouble-dialog/having-trouble-dialog.component.css"]
})
export class HavingTroubleDialogComponent implements OnInit {
  isVerification: boolean;
  emailVerifyForm: FormGroup;
  showPassword: boolean = false;
  message: string;
  isSubmitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  get email() {
    return this.emailVerifyForm.get("email");
  }

  get password() {
    return this.emailVerifyForm.get("password");
  }

  showVerificationForm() {
    if (this.isVerification) {
      return;
    }
    this.isVerification = true;
    this.emailVerifyForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  async sendVerificationMail() {
    this.isSubmitted = true;
    if (this.emailVerifyForm.invalid) {
      this.isSubmitted = false;
      return;
    }
    const { email, password } = this.emailVerifyForm.value;
    this.authService.signInAndVerifyMail(email, password).then(res => {
      this.message = res;
      if (res !== "Verification mail sent.") {
        this.isSubmitted = false;
      }
    });
  }

  ngOnInit(): void {}
}
