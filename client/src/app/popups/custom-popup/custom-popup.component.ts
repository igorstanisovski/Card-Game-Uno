import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-custom-popup',
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.css']
})
export class CustomPopupComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<CustomPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  getData() {
    return this.data.message;
  }
  
  ngOnInit(): void {
  }

}
