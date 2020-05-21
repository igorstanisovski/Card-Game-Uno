import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user:User = {_id:'',name:'', lastname:'',username:'',password:'',email:'',country:'',city:'',address:'',age:0,gender:'',zip:0}
  constructor(private userService:UserService,private route: ActivatedRoute,private router: Router) { }

  login(): void {
    this.userService.login(this.user).subscribe(user => {
      this.route.queryParams.subscribe( params => {
        this.router.navigateByUrl('');
      });
    });
  }

  ngOnInit(): void {
  }

}
