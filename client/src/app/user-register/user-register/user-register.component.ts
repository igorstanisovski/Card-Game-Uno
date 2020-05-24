import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  fileToUpload: File = null;
  user:User = {_id:'',name:'', lastname:'',username:'',password:'',email:'',country:'',city:'',address:'',age:null,gender:'',zip:null, picture_path:'', gameSettings: {
    gamesPlayed:null,
    wins:null
  }}
  constructor(private userService:UserService,private route: ActivatedRoute,private router: Router) { }
  
  register(): void {
    this.userService.register(this.fileToUpload,this.user).subscribe(user => {
      this.route.queryParams.subscribe( params => {
        this.router.navigateByUrl('user-login');
      });
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  

  ngOnInit(): void {
  }

}
