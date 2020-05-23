import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-pick-color-card',
  templateUrl: './pick-color-card.component.html',
  styleUrls: ['./pick-color-card.component.css']
})
export class PickColorCardComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<PickColorCardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  numberOfRedCards:number;
  numberOfGreenCards:number;
  numberOfBlueCards:number;
  numberOfYellowCards:number;
  getRedCards() {
    return this.numberOfRedCards;
  }
  getBlueCards() {
    return this.numberOfBlueCards;
  }
  getGreenCards() {
    return this.numberOfGreenCards;
  }
  getYellowCards() {
    return this.numberOfYellowCards;
  }

  ngOnInit(): void {
    this.numberOfRedCards = 0;
    this.numberOfBlueCards = 0;
    this.numberOfGreenCards = 0;
    this.numberOfYellowCards = 0;
    console.log(this.data);
    for(var i = 0;i < this.data.cards.length;i++) {
      if(this.data.cards[i].color === "Red"){
        this.numberOfRedCards++;
      }
      else if(this.data.cards[i].color === "Green"){
        this.numberOfGreenCards++;
      }
      else if(this.data.cards[i].color === "Blue"){
        this.numberOfBlueCards++;
      }
      else if(this.data.cards[i].color === "Yellow"){
        this.numberOfYellowCards++;
      }
    }
  }

}
