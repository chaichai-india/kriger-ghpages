import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";
import { take, tap, switchMap, catchError } from "rxjs/operators";

import { PostService, ProfileService } from "../../../core";
import { AuthService } from "../../../services/authentication/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  uid: string;
  user_id: string;
  postSubject = new BehaviorSubject<any>([]);
  post$ = this.postSubject.asObservable();
  loading = new BehaviorSubject<Boolean>(true);
  loading$ = this.loading.asObservable();
  error: boolean = false;
  errorMessage: string;
  infiniteDisable: boolean = true;
  scrollCount: number = 0;
  lastPostValue: number = 0;
  isEmpty: boolean = false;
  isComplete: boolean = false;

  @ViewChild("loadbtn", { read: ElementRef }) public laodbtn: ElementRef<any>;

  updateState(lastPostValue: number) {
    this.loading.next(false);
    this.lastPostValue = lastPostValue;
  }

  nextBatch() {
    this.scrollCount++;
    if (this.scrollCount > 2) {
      this.infiniteDisable = true;
      return;
    }
    console.log("next batch");
    this.loading.next(true);
    this.postService
      .getPosts({
        mode: "scroll",
        user_id: this.user_id,
        post_id: this.lastPostValue.toString(),
      })
      .pipe(
        tap((data) => {
          console.log({ data });
          const { posts = [] } = data || {};
          const currentposts = this.postSubject.getValue();
          this.postSubject.next([...currentposts, ...posts]);

          const lastPost = posts[posts.length - 1] || {};
          const { value = 0 } = lastPost;
          console.log({ value });
          this.updateState(value);
          // if (posts.length == 0 || posts.length < 10) {
          //   this.setCompleteState();
          // }
        }),
        take(1),
        catchError((err) => {
          this.setErrorStatus(err, "Something went wrong!");
          this.postSubject.next([]);
          return of({ posts: [] });
        })
      )
      .subscribe();
  }

  async init() {
    try {
      this.uid = await this.authService.getCurrentUser();
      console.log({ uid: this.uid });
      if (this.uid) {
        this.profileService
          .getIdbyFirebaseuid(this.uid)
          .pipe(
            tap(({ _id }) => {
              this.user_id = _id;
            }),
            switchMap(({ _id }) => this.postService.getPosts({ user_id: _id })),
            tap((data) => {
              console.log({ data });
              const { posts = [] } = data || {};
              this.postSubject.next(posts);
              const lastPost = posts[posts.length - 1] || {};
              const { value = 0 } = lastPost;
              console.log({ value });
              this.updateState(value);
              if (posts.length == 0) {
                this.setEmptyState();
              } else if (posts.length < 10) {
                // this.setCompleteState();
              } else if (posts.length == 10) {
                this.setContinueState();
              }
            }),
            take(1),
            catchError((err) => {
              this.setErrorStatus(err, "Something went wrong!");
              this.postSubject.next([]);
              return of({ notifications: [] });
            })
          )
          .subscribe();
      }
    } catch (error) {
      console.log(error);
    }
  }

  resetInfinite() {
    this.infiniteDisable = false;
    this.scrollCount = 0;
    this.nextBatch();
  }

  setEmptyState() {
    this.isEmpty = true;
    this.infiniteDisable = true;
  }

  setCompleteState() {
    this.infiniteDisable = true;
    this.isComplete = true;
  }

  setContinueState() {
    this.infiniteDisable = false;
  }

  setErrorStatus(err, msg: string) {
    console.log({ err });
    this.loading.next(false);
    this.error = true;
    console.log({ err });
    this.errorMessage = msg;
  }

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private postService: PostService,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.renderer.addClass(document.body, "body-bg");
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "body-bg");
  }
}
