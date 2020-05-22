import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupsRoutingModule } from './popups-routing.module';
import { PickColorCardComponent } from './pick-color-card/pick-color-card.component';
import { YourTurnPopupComponent } from './your-turn-popup/your-turn-popup.component';


@NgModule({
  declarations: [PickColorCardComponent, YourTurnPopupComponent],
  imports: [
    CommonModule,
    PopupsRoutingModule
  ]
})
export class PopupsModule { }
