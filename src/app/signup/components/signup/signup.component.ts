import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
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
      name: "Parent (Signing up for my child)",
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
      id: 0,
      name: "Teacher",
      checked: false
    },
    {
      id: 1,
      name: "Lecturer",
      checked: false
    },
    {
      id: 2,
      name: "Professor",
      checked: false
    },
    {
      id: 3,
      name: "Counselor",
      checked: false
    },
    {
      id: 4,
      name: "Tutor",
      checked: false
    },
    {
      id: 5,
      name: "Author",
      checked: false
    },
    {
      id: 6,
      name: "Trainer",
      checked: false
    },
    {
      id: 7,
      name: "Career Counselor",
      checked: false
    }
  ];

  constructor() {}

  ngOnInit() {}
}
