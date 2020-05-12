import { Component, OnInit, Inject, Renderer2, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  ];

  checkBoxValue;
  signupForm: FormGroup;
  isFormSubmitted: boolean;
  showPassword = false;
  currentFormState = "initial";
  currentCheckboxState = "final";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private renderer: Renderer2
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
    return educatorCheck.length
      ? true
      : false || learnerCheck.length
      ? true
      : false || instituteCheck.length
      ? true
      : false;
  }

  showSignupForm() {
    if (!this.isCheckbox) {
      alert("Select a user type");
      return;
    }
    this.currentCheckboxState = "initial";
    this.currentFormState = "final";
  }

  showCheckedBox() {
    this.currentCheckboxState = "final";
    this.currentFormState = "initial";
  }

  buildSignupForm() {
    this.signupForm = this.formBuilder.group({
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
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required]],
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
    });
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

  //   async signup() {
  //     const isFormValid = this.signupForm.valid;
  //     this.isFormSubmitted = true;
  //     if (!isFormValid) {
  //       alert("Form Details Invalid. Please Check.");
  //       this.isFormSubmitted = false;
  //       return;
  //     }
  //     const { email, password, phone: contact } = this.signupForm.value;
  //     const type = this.checkBoxValue;
  //     const date_of_joining = this.timeService.timestamp;
  //     let firstname: string = this.signupForm.value.firstname;
  //     let first_name = firstname.trim();
  //     let lastname: string = this.signupForm.value.lastname;
  //     let last_name = lastname.trim();
  //     let city: string = this.signupForm.value.city;
  //     let current_city = city.trim();
  //     const name = first_name + " " + last_name;
  //     const data = {
  //       first_name,
  //       last_name,
  //       email,
  //       password,
  //       current_city,
  //       contact,
  //       type,
  //       date_of_joining,
  //       name,
  //     };
  //     // console.log(data);
  //     // this.dialog.open(SignupDialogComponent, {
  //     //   data: { message: "works" }
  //     // });
  //     await this.signupService
  //       .signup(data)
  //       .then((response) => {
  //         // console.log(response);
  //         this.dialog.open(SignupDialogComponent, {
  //           data: { message: response },
  //         });
  //         this.router.navigate(["/login"]);
  //       })
  //       .catch((err) => {
  //         // alert("something went wrong!! Please try again.");
  //         this.dialog.open(SignupDialogComponent, {
  //           data: { message: "something went wrong!! Please try again." },
  //         });
  //         this.isFormSubmitted = false;
  //       });
  //   }

  signup() {
    this.dialog.open(SignupDialogComponent, {
      data: { message: "Something went wrong!" },
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
