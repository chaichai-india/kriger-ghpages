import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MomentModule } from 'ngx-moment';

import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

import { ReversePipe } from '../pipes/reverse.pipe';

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    PostDetailComponent,
    ReversePipe
  ],
  imports: [CommonModule, PostRoutingModule, MatCardModule, MomentModule],
  exports: [PostListComponent]
})
export class PostModule {}
