import { Component, OnInit } from "@angular/core";
import { InternshipsComponent } from "../internships/internships.component";
import { MediacoverageComponent } from "../mediacoverage/mediacoverage.component";
// import { CareersComponent } from "../careers/careers.component";
import { TncComponent } from "../tnc/tnc.component";
import { OurteamComponent } from "../ourteam/ourteam.component";
import { InternshipTncComponent } from "../internship-tnc/internship-tnc.component";
import { Router, ActivatedRoute } from "@angular/router";
import { VisitusComponent } from "../visitus/visitus.component";

@Component({
  selector: "app-central",
  templateUrl: "./central.component.html",
  styleUrls: ["./central.component.css"]
})
export class CentralComponent implements OnInit {
  currentComponent;
  constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.router.url === "/internships") {
      this.currentComponent = InternshipsComponent;
    }
    if (this.router.url === "/media-coverage") {
      this.currentComponent = MediacoverageComponent;
    }
    // if (this.router.url === "/careers") {
    //   this.currentComponent = CareersComponent;
    // }
    if (this.router.url === "/term-conditions") {
      this.currentComponent = TncComponent;
    }
    if (this.router.url === "/our-team") {
      this.currentComponent = OurteamComponent;
    }
    if (this.router.url === "/internship-tnc") {
      this.currentComponent = InternshipTncComponent;
    }
    if (this.router.url === "/visit-us") {
      this.currentComponent = VisitusComponent;
    }
  }
}
