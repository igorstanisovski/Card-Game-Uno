import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRegisterRoutingModule } from './user-register-routing.module';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserRegisterComponent],
  imports: [
    CommonModule,
    UserRegisterRoutingModule,
    FormsModule
  ]
})
export class UserRegisterModule { }
