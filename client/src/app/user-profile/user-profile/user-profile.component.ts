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

  fileToUpload:File = null;
  user:User = {_id:'',name:'', lastname:'',username:'',password:'',email:'',country:'',city:'',address:'',age:null,gender:'',zip:null,picture_path:'',gameSettings: {
    gamesPlayed:null,
    wins:0
  }}
    host = UserService.host;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  openFileDialog() {
    document.querySelector('input').click();
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.userService.changeProfilePicture(this.fileToUpload,this.user._id).subscribe(user => {
      this.route.queryParams.subscribe( params => {
        this.router.navigate(['/user-profile', this.user._id]);
        location.reload();
      });
    });
  }

  getUser(_id:string): void {
    this.userService.getUser(_id).subscribe(user => this.user = user);
  }

  getLocalUser() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user._id === user._id){
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>this.getUser(params['_id']));
  }

}
