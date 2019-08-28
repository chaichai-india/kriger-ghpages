import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PostRoutingModule } from "./post-routing.module";

import { MatCardModule } from "@angular/material/card";
import { MomentModule } from "ngx-moment";
import { LinkyModule } from "ngx-linky";
import { MatLinkPreviewModule } from "@angular-material-extensions/link-preview";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
// import { ImageCropperModule } from 'ngx-image-cropper';
import { ClipboardModule } from "ngx-clipboard";

import {
  PostComponent,
  ShareDialogComponent
} from "./components/post/post.component";
import { DialogComponent } from "./components/post/post.component";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { AdbannerComponent } from "../components/adbanner/adbanner.component";

import { ReversePipe } from "../pipes/reverse.pipe";
import { SharedModule } from "../shared/shared.module";
import { CreatePostComponent } from "./components/create-post/create-post.component";
import {
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { CommentListComponent } from "./components/comment-list/comment-list.component";
import { CommentComponent } from "./components/comment/comment.component";
import { CreateCommentComponent } from "./components/create-comment/create-comment.component";

@NgModule({
  declarations: [
    PostComponent,
    DialogComponent,
    ShareDialogComponent,
    PostListComponent,
    PostDetailComponent,
    AdbannerComponent,
    ReversePipe,
    CreatePostComponent,
    CommentListComponent,
    CommentComponent,
    CreateCommentComponent
  ],
  entryComponents: [DialogComponent, ShareDialogComponent],
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
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    InfiniteScrollModule,
    MatSnackBarModule,
    ClipboardModule,
    // ImageCropperModule,
    SharedModule
  ],
  exports: [PostListComponent]
})
export class PostModule {}
