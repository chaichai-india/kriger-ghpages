import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"],
})
export class PostDetailComponent implements OnInit {
  data;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.data = this.route.snapshot.data.data;
    this.data.extended = true;
  }
}
