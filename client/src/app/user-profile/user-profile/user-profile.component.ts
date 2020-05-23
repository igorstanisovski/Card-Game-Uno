import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  user:User = {_id:'',name:'', lastname:'',username:'',password:'',email:'',country:'',city:'',address:'',age:null,gender:'',zip:null,picture_path:'',gameSettings: {
    gamesPlayed:null,
    wins:0
  }}
  host = UserService.host;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  getUser(_id:string): void {
    this.userService.getUser(_id).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>this.getUser(params['_id']));
  }

}
