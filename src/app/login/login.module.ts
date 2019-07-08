import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import {
  LoginComponent,
  LoginDialogComponent,
  ForgotPasswordDialogComponent,
  HavingTroubleDialogComponent
} from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatIconModule,
  MatDialogModule
} from "@angular/material";
// import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule({
  declarations: [
    LoginComponent,
    LoginDialogComponent,
    ForgotPasswordDialogComponent,
    HavingTroubleDialogComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    ForgotPasswordDialogComponent,
    HavingTroubleDialogComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule
  ]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LoginModule {}
