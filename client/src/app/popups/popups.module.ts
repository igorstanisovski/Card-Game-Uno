import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupsRoutingModule } from './popups-routing.module';
import { PickColorCardComponent } from './pick-color-card/pick-color-card.component';


@NgModule({
  declarations: [PickColorCardComponent],
  imports: [
    CommonModule,
    PopupsRoutingModule
  ]
})
export class PopupsModule { }
