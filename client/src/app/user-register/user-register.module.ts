import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRegisterRoutingModule } from './user-register-routing.module';
import { UserRegisterComponent } from './user-register/user-register.component';


@NgModule({
  declarations: [UserRegisterComponent],
  imports: [
    CommonModule,
    UserRegisterRoutingModule
  ]
})
export class UserRegisterModule { }
