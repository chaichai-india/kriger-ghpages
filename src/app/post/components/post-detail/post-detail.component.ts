import { Component, OnInit } from "@angular/core";

// import { PostService } from "../../../services/database/post.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { PostService } from "../../../core";
import { take, tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
// import { AuthService } from "../../../services/authentication/auth.service";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"],
})
export class PostDetailComponent implements OnInit {
  data;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.data = this.route.snapshot.data.data;
  }
}
