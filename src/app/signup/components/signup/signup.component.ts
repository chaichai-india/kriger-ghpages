import { Component, OnInit, Inject, Renderer2, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
} from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
// import { TimestampService } from "../../../services/utility/timestamp.service";
// import { SignupService } from "../../../services/authentication/signup.service";
// import { AuthService } from "../../../services/authentication/auth.service";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { SnackbarService, SignupService } from "../../../core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { debounceTime, tap, map, catchError } from "rxjs/operators";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  animations: [
    trigger("toggleSignup", [
      state(
        "initial",
        style({
          opacity: "0",
          display: "none",
        })
      ),
      state(
        "final",
        style({
          opacity: "1",
          display: "block",
        })
      ),
      transition("initial<=>final", animate("0ms")),
    ]),
  ],
})
export class SignupComponent implements OnInit, OnDestroy {
  learnerCheckbox = [
    {
      id: 0,
      name: "Exam Aspirant",
      checked: false,
    },
    {
      id: 1,
      name: "Parent",
      checked: false,
    },
    {
      id: 2,
      name: "Researcher",
      checked: false,
    },
    {
      id: 3,
      name: "Scholar",
      checked: false,
    },
    {
      id: 4,
      name: "Student",
      checked: false,
    },
    {
      id: 5,
      name: "Working Professional",
      checked: false,
    },
  ];

  educatorCheckbox = [
    {
      id: 20,
      name: "Author",
      checked: false,
    },
    {
      id: 21,
      name: "Coaching Faculty",
      checked: false,
    },
    {
      id: 22,
      name: "Counselor",
      checked: false,
    },
    {
      id: 23,
      name: "Lecturer",
      checked: false,
    },
    {
      id: 24,
      name: "Professor",
      checked: false,
    },
    {
      id: 25,
      name: "Skill Trainer",
      checked: false,
    },
    {
      id: 26,
      name: "Teacher",
      checked: false,
    },
    {
      id: 27,
      name: "Tutor",
      checked: false,
    },
  ];

  instituteCheckbox = [
    {
      id: 40,
      name: "Coaching Institute",
      checked: false,
    },
    {
      id: 41,
      name: "College",
      checked: false,
    },
    {
      id: 42,
      name: "Play School",
      checked: false,
    },
    {
      id: 43,
      name: "School",
      checked: false,
    },
    {
      id: 44,
      name: "Training Institute",
      checked: false,
    },
    {
      id: 45,
      name: "Vocational School",
      checked: false,
    },
    {
      id: 46,
      name: "Entrance Exam Coaching",
      checked: false,
    },
  ];

  checkBoxValue;
  signupForm: FormGroup;
  isFormSubmitted: boolean;
  showPassword = false;
  currentFormState = "initial";
  currentCheckboxState = "final";
  usernameAvailable = new BehaviorSubject(false);
  usernameAvailable$ = this.usernameAvailable.asObservable();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private snackbarService: SnackbarService,
    private signupService: SignupService
  ) {
    this.renderer.addClass(document.body, "body-bg");
  }

  getLearnerCheckboxes() {
    this.resetEducatorCheckbox();
    this.resetInstituteCheckbox();
    let checked = this.learnerCheckbox
      .filter((learner) => learner.checked)
      .map((learner) => learner.id);
    // console.log(checked);
    this.checkBoxValue = checked;
  }

  resetLearnerCheckbox() {
    this.checkBoxValue = [];
    this.learnerCheckbox.forEach((learner) => {
      learner.checked = false;
    });
  }

  getEducatorCheckboxes() {
    this.resetLearnerCheckbox();
    this.resetInstituteCheckbox();
    let checked = this.educatorCheckbox
      .filter((educator) => educator.checked)
      .map((educator) => educator.id);
    // console.log(checked);
    this.checkBoxValue = checked;
  }

  resetEducatorCheckbox() {
    this.checkBoxValue = [];
    this.educatorCheckbox.forEach((educator) => {
      educator.checked = false;
    });
  }

  getInstituteCheckboxes() {
    this.resetLearnerCheckbox();
    this.resetEducatorCheckbox();
    let checked = this.instituteCheckbox
      .filter((institute) => institute.checked)
      .map((institute) => institute.id);
    // console.log(checked);
    this.checkBoxValue = checked;
  }

  resetInstituteCheckbox() {
    this.checkBoxValue = [];
    this.instituteCheckbox.forEach((institute) => {
      institute.checked = false;
    });
  }

  get isCheckbox() {
    let educatorCheck = this.educatorCheckbox.filter(
      (educator) => educator.checked
    );
    let learnerCheck = this.learnerCheckbox.filter(
      (learner) => learner.checked
    );

    let instituteCheck = this.instituteCheckbox.filter(
      (institute) => institute.checked
    );

    return (
      !!educatorCheck.length || !!learnerCheck.length || !!instituteCheck.length
    );
  }

  showSignupForm() {
    if (!this.isCheckbox) {
      this.snackbarService.openErrorBar("Select a user type");
      return;
    }
    this.currentCheckboxState = "initial";
    this.currentFormState = "final";

    this.setNameValidators();
  }

  showCheckedBox() {
    this.currentCheckboxState = "final";
    this.currentFormState = "initial";
  }

  setNameValidators() {
    if (this.checkBoxValue[0] >= 40) {
      this.institutename.setValidators([
        Validators.pattern("[a-zA-Z ]*"),
        Validators.maxLength(50),
        Validators.required,
      ]);
      this.institutename.updateValueAndValidity();
    } else {
      this.firstname.setValidators([
        Validators.pattern("[a-zA-Z ]*"),
        Validators.maxLength(50),
        Validators.required,
      ]);
      this.firstname.updateValueAndValidity();

      this.lastname.setValidators([
        Validators.pattern("[a-zA-Z ]*"),
        Validators.maxLength(50),
        Validators.required,
      ]);
      this.lastname.updateValueAndValidity();
    }
  }

  checkUsernameAvailability({
    value,
  }: AbstractControl): Observable<ValidationErrors | null> {
    console.log({ value });

    return this.signupService.checkUsernameAvailability(value).pipe(
      debounceTime(1000),
      map((response) => {
        console.log({ response });
        let { available = false } = response || {};
        if (!available) {
          this.usernameAvailable.next(false);
          return { isExists: true };
        }
        this.usernameAvailable.next(true);
        return null;
      }),
      catchError((err) => {
        console.log({ validatorError: err });
        this.usernameAvailable.next(false);
        return of({ available: false });
      })
    );
  }

  buildSignupForm() {
    this.signupForm = this.formBuilder.group(
      {
        institutename: [
          "",
          [Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(50)],
        ],
        firstname: [
          "",
          [Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(50)],
        ],
        lastname: [
          "",
          [Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(50)],
        ],
        gender: ["1"],
        email: ["", [Validators.required, Validators.email]],
        username: [
          "",
          {
            validators: [Validators.required],
            asyncValidators: [this.checkUsernameAvailability.bind(this)],
            updateOn: "blur",
          },
        ],
        password: ["", [Validators.required, Validators.minLength(6)]],
        //   city: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
        phone: [
          "",
          [
            Validators.required,
            Validators.pattern("^[6-9][0-9]{9}$"),
            Validators.maxLength(10),
          ],
        ],
        referral: [""],
      }
      // { updateOn: "blur" }
    );
  }

  get formControls() {
    return this.signupForm.controls;
  }

  get institutename() {
    return this.signupForm.get("institutename");
  }

  get firstname() {
    return this.signupForm.get("firstname");
  }

  get lastname() {
    return this.signupForm.get("lastname");
  }

  get email() {
    return this.signupForm.get("email");
  }

  get username() {
    return this.signupForm.get("username");
  }

  get password() {
    return this.signupForm.get("password");
  }

  get phone() {
    return this.signupForm.get("phone");
  }

  get referral() {
    return this.signupForm.get("referral");
  }

  async signup() {
    const isFormValid = this.signupForm.valid;
    this.isFormSubmitted = true;
    if (!isFormValid) {
      this.snackbarService.openErrorBar("Form Details Invalid. Please Check.");
      this.isFormSubmitted = false;
      return;
    }
    console.log({ value: this.signupForm.value });

    let {
      email,
      password,
      firstname,
      lastname,
      institutename,
      username,
      referral: referral_code,
      gender,
      phone: contact,
    } = this.signupForm.value;

    if (institutename) firstname = institutename;
    firstname = firstname.trim();
    lastname = lastname.trim();
    username = username.trim();
    referral_code = referral_code.trim();
    gender = +gender;

    try {
      let {
        success,
        response,
        uid: firebase_uid,
      } = await this.signupService.firebaseSignup({
        email,
        password,
      });
      console.log({ success, response, firebase_uid });

      if (success) {
        const body = {
          firebase_uid,
          firstname,
          lastname,
          email,
          password,
          gender,
          contact,
          username,
          referral_code,
          type: this.checkBoxValue,
        };

        this.signupService.serverSignup(body).subscribe(
          (event) => {
            if (event.type === HttpEventType.Response) {
              this.openDialog({ message: response, success });
            }
          },
          (err) => {
            console.log({ serverSignupError: err });
            response = "Something went wrong!";
            this.openDialog({ message: response });
          }
        );
      } else {
        this.openDialog({ message: response });
      }
    } catch (error) {
      console.log({ error });
      let response = "Something went wrong!";
      this.openDialog({ message: response });
    }
  }

  openDialog(data) {
    this.dialog
      .open(SignupDialogComponent, { data })
      .afterClosed()
      .subscribe(() => {
        if (data.success) {
          this.router.navigate(["/login"]);
        }
        this.isFormSubmitted = false;
      });
  }

  ngOnInit() {
    this.buildSignupForm();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "body-bg");
  }
}

@Component({
  selector: "app-signup-dialog",
  templateUrl: "../signup-dialog/signup-dialog.component.html",
  styleUrls: ["../signup-dialog/signup-dialog.component.css"],
})
export class SignupDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
