import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user:User;
  host = UserService.host;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private el: ElementRef) {
  }
  
  editProfile() {
    this.userService.editProfile(this.user).subscribe(user => {
      this.route.queryParams.subscribe( params => {
        this.router.navigate(['/user-profile', this.user._id]);
      });
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

}
