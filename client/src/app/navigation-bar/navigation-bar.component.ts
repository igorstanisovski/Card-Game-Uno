import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private router: Router) {}

  isLoggedIn() {
    if(localStorage.getItem('currentUser')){
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('');
  }

  get user(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
  }

}
