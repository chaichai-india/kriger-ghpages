import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SignupRoutingModule } from "./signup-routing.module";
import {
  SignupComponent,
  SignupDialogComponent
} from "./components/signup/signup.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatIconModule,
  MatDialogModule
} from "@angular/material";

@NgModule({
  declarations: [SignupComponent, SignupDialogComponent],
  entryComponents: [SignupDialogComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSnackBarModule
  ]
})
export class SignupModule {}
