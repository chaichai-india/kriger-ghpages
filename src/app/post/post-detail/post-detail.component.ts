import { Component, OnInit } from '@angular/core';

import { PostService } from '../../services/database/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  id: string;
  post;
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.post = this.postService.getPost(this.id);
  }
}
