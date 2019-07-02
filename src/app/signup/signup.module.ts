import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SignupRoutingModule } from "./signup-routing.module";
import { SignupComponent } from "./components/signup/signup.component";
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
  MatStepperModule
} from "@angular/material";

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MatStepperModule,
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
