import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user:User;

  password:string;
  newPassword: string;
  repeatNewPassword:string;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  changePassword() {
    if(this.newPassword !== this.repeatNewPassword){
      window.alert("New password does not match!")
    }
    else if(this.newPassword === this.password) {
      window.alert("You can't use an old password!");
    }
    else {
      this.userService.changePassowrd(this.password,this.newPassword,this.user).subscribe(user => {
        this.route.queryParams.subscribe( params => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/user-login']);
        });
      });
    }
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

}
