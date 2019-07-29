import { Component, OnInit } from "@angular/core";
import { PARTNERS, FEATUREDIMAGES, AWARDS } from "../landingpage/images-data";

@Component({
  selector: "app-newlandingpage",
  templateUrl: "./newlandingpage.component.html",
  styleUrls: ["./newlandingpage.component.css"]
})
export class NewlandingpageComponent implements OnInit {
  featuredImages = FEATUREDIMAGES;
  partnerImages = PARTNERS;
  awardImages = AWARDS;

  constructor() {}

  ngOnInit() {}
}
