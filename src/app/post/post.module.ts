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

import { PostComponent } from './components/post/post.component';
import { DialogComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { AdbannerComponent } from '../components/adbanner/adbanner.component';

import { ReversePipe } from '../pipes/reverse.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostComponent,
    DialogComponent,
    PostListComponent,
    PostDetailComponent,
    AdbannerComponent,
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
    MatDialogModule,
    SharedModule
  ],
  exports: [PostListComponent]
})
export class PostModule {}
