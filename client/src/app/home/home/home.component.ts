import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
  }

}
