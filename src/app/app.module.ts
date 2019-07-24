import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import {
  NavbarComponent,
  NavDialogComponent
} from "./components/ui/navbar/navbar.component";
// import { DialogComponent } from "../app/post/components/post/post.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

// import { PostModule } from "./post/post.module";
// import { ProfileModule } from "./profile/profile.module";
// import { BlogModule } from "./blog/blog.module";
// import { LoginModule } from "./login/login.module";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatLinkPreviewModule } from "@angular-material-extensions/link-preview";
import { Ng2ImgMaxModule } from "ng2-img-max";

// import { SlideshowModule } from 'ng-simple-slideshow';
import { SharedModule } from "./shared/shared.module";
import { FooterComponent } from "./components/ui/footer/footer.component";
import { LandingpageComponent } from "./components/landingpage/landingpage.component";
import { AuthGuard } from "./services/authentication/auth.guard";
import { LoginGuard } from "./services/authentication/login.guard";
import {
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { NewlandingpageComponent } from "./components/newlandingpage/newlandingpage.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    NavbarComponent,
    NavDialogComponent,
    PageNotFoundComponent,
    FooterComponent,
    LandingpageComponent,
    NewlandingpageComponent
  ],
  entryComponents: [NavDialogComponent],
  imports: [
    BrowserModule,
    // PostModule,
    // ProfileModule,
    // BlogModule,
    // LoginModule,
    AppRoutingModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatLinkPreviewModule.forRoot(),
    Ng2ImgMaxModule,
    // SlideshowModule,
    SharedModule
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
