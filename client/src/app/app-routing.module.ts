import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './login.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(home => home.HomeModule) },
  { path: 'user-login', loadChildren: () => import('./user-login/user-login.module').then(user => user.UserLoginModule) },
  { path: 'user-register', loadChildren: () => import('./user-register/user-register.module').then(user => user.UserRegisterModule) },
  { path: 'play', loadChildren: () => import('./play/play.module').then(play => play.PlayModule), canActivate: [LoginGuard] },
  { path: 'user-profile/:_id', loadChildren: () => import('./user-profile/user-profile.module').then(user => user.UserProfileModule), canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
