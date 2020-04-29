// import { Component, OnInit } from "@angular/core";

// import { PostService } from "../../../services/database/post.service";
// import { Router, ActivatedRoute, Params } from "@angular/router";
// // import { AuthService } from "../../../services/authentication/auth.service";

// @Component({
//   selector: "app-post-detail",
//   templateUrl: "./post-detail.component.html",
//   styleUrls: ["./post-detail.component.css"]
// })
// export class PostDetailComponent implements OnInit {
//   id: string;
//   isAuth: boolean;
//   post;

//   getPost(id: string) {
//     this.postService.getPost(id).then(res => {
//       if (res) {
//         this.post = res;
//       } else {
//         this.router.navigate(["404"]);
//       }
//     });
//   }
//   constructor(
//     private postService: PostService,

//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.id = this.route.snapshot.params["id"];
//     // console.log(this.id);
//     // this.isAuth = this.authService.isLoggedIn;
//     // console.log(this.isAuth);

//     this.getPost(this.id);
//   }
// }
