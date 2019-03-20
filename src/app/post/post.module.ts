import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MomentModule } from 'ngx-moment';
import { LinkyModule } from 'ngx-linky';
import { MatLinkPreviewModule } from '@angular-material-extensions/link-preview';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { PostComponent } from './post/post.component';
import { DialogComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

import { ReversePipe } from '../pipes/reverse.pipe';

@NgModule({
  declarations: [
    PostComponent,
    DialogComponent,
    PostListComponent,
    PostDetailComponent,
    ReversePipe
  ],
  entryComponents: [DialogComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatCardModule,
    MomentModule,
    LinkyModule,
    MatLinkPreviewModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [PostListComponent]
})
export class PostModule {}
