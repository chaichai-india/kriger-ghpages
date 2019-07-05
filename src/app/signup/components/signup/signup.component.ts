import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { TimestampService } from "src/app/services/utility/timestamp.service";
import { SignupService } from "src/app/services/authentication/signup.service";
import { AuthService } from "src/app/services/authentication/auth.service";
import { Router } from "@angular/router";

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
          display: "none"
        })
      ),
      state(
        "final",
        style({
          opacity: "1",
          display: "block"
        })
      ),
      transition("initial<=>final", animate("0ms"))
    ])
  ]
})
export class SignupComponent implements OnInit {
  learnerCheckbox = [
    {
      id: 0,
      name: "Student",
      checked: false
    },
    {
      id: 1,
      name: "Parent",
      checked: false
    },
    {
      id: 2,
      name: "Exam Aspirant",
      checked: false
    },
    {
      id: 3,
      name: "Scholar",
      checked: false
    },
    {
      id: 4,
      name: "Researcher",
      checked: false
    }
  ];

  educatorCheckbox = [
    {
      id: 20,
      name: "Teacher",
      checked: false
    },
    {
      id: 21,
      name: "Lecturer",
      checked: false
    },
    {
      id: 22,
      name: "Professor",
      checked: false
    },
    {
      id: 23,
      name: "Counselor",
      checked: false
    },
    {
      id: 24,
      name: "Tutor",
      checked: false
    },
    {
      id: 25,
      name: "Author",
      checked: false
    },
    {
      id: 26,
      name: "Trainer",
      checked: false
    },
    {
      id: 27,
      name: "Career Counselor",
      checked: false
    }
  ];

  checkBoxValue;
  signupForm: FormGroup;
  isFormSubmitted: boolean;
  showPassword = false;
  currentFormState = "initial";
  currentCheckboxState = "final";

  constructor(
    private formBuilder: FormBuilder,
    private timeService: TimestampService,
    private signupService: SignupService,
    private authService: AuthService,
    private router: Router
  ) {}

  getLearnerCheckboxes() {
    this.resetEducatorCheckbox();
    let checked = this.learnerCheckbox
      .filter(learner => learner.checked)
      .map(learner => learner.id);
    console.log(checked);
    this.checkBoxValue = checked;
  }

  resetLearnerCheckbox() {
    this.checkBoxValue = [];
    this.learnerCheckbox.forEach(learner => {
      learner.checked = false;
    });
  }

  getEducatorCheckboxes() {
    this.resetLearnerCheckbox();
    let checked = this.educatorCheckbox
      .filter(educator => educator.checked)
      .map(educator => educator.id);
    console.log(checked);
    this.checkBoxValue = checked;
  }

  resetEducatorCheckbox() {
    this.checkBoxValue = [];
    this.educatorCheckbox.forEach(educator => {
      educator.checked = false;
    });
  }

  get isCheckbox() {
    let educatorCheck = this.educatorCheckbox.filter(
      educator => educator.checked
    );
    let learnerCheck = this.learnerCheckbox.filter(learner => learner.checked);
    return educatorCheck.length
      ? true
      : false || learnerCheck.length
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
      firstname: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z ]*"),
          Validators.maxLength(50)
        ]
      ],
      lastname: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z ]*"),
          Validators.maxLength(50)
        ]
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      city: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      phone: [
        "",
        [
          Validators.required,
          Validators.pattern("^[6-9][0-9]{9}$"),
          Validators.maxLength(10)
        ]
      ]
    });
  }

  get formControls() {
    return this.signupForm.controls;
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

  get password() {
    return this.signupForm.get("password");
  }

  get city() {
    return this.signupForm.get("city");
  }

  get phone() {
    return this.signupForm.get("phone");
  }

  async signup() {
    const isFormValid = this.signupForm.valid;
    this.isFormSubmitted = true;
    if (!isFormValid) {
      alert("Form Details Invalid. Please Check.");
      this.isFormSubmitted = false;
      return;
    }
    const { email, password, phone: contact } = this.signupForm.value;
    const type = this.checkBoxValue;
    const date_of_joining = this.timeService.timestamp;
    let firstname: string = this.signupForm.value.firstname;
    let first_name = firstname.trim();
    let lastname: string = this.signupForm.value.lastname;
    let last_name = lastname.trim();
    let city: string = this.signupForm.value.city;
    let current_city = city.trim();
    const name = first_name + " " + last_name;
    const data = {
      first_name,
      last_name,
      email,
      password,
      current_city,
      contact,
      type,
      date_of_joining,
      name
    };
    console.log(data);

    await this.signupService
      .signup(data)
      .then(() => {
        this.router.navigate(["/login"]);
      })
      .catch(err => {
        alert("something went wrong!! Please try again.");
        this.isFormSubmitted = false;
      });
  }

  ngOnInit() {
    this.buildSignupForm();
  }
}
