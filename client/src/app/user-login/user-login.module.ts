import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLoginRoutingModule } from './user-login-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
    UserLoginRoutingModule,
    FormsModule
  ]
})
export class UserLoginModule { }
