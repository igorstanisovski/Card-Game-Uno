import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PickColorCardComponent } from '../popups/pick-color-card/pick-color-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    // public dialog: MatDialog,
    private router: Router) {}

  // try() {
  //   const dialogRef=this.dialog.open(PickColorCardComponent);  //Open MatDialog and load component dynamically  
  
  //   //Need to subscribe afterClosed event of MatDialog   
  //   dialogRef.afterClosed().subscribe(confirmresult=>{  
  //     console.log("You have picked color: " + confirmresult);  
  //     // if(confirmresult){            //if dialog result is yes, delete post  
  //     //   console.log("Delete confirm is approved by user.");  
  //     // }  
  //     // else{                        //if dialog result is no, DO NOT delete post  
  //     //   console.log("Delete confirm is cancelled by user.");  
  //     // }  
  //   }) 
  // }

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
