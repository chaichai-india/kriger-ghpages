import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, NgxAuthFirebaseUIModule]
})
export class LoginModule {}
