import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(home => home.HomeModule) },
  { path: 'user-login', loadChildren: () => import('./user-login/user-login.module').then(user => user.UserLoginModule) },
  { path: 'user-register', loadChildren: () => import('./user-register/user-register.module').then(user => user.UserRegisterModule) },
  { path: 'play', loadChildren: () => import('./play/play.module').then(play => play.PlayModule) },
  { path: 'user-profile', loadChildren: () => import('./user-profile/user-profile.module').then(user => user.UserProfileModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
