import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupsRoutingModule } from './popups-routing.module';
import { PickColorCardComponent } from './pick-color-card/pick-color-card.component';
import { YourTurnPopupComponent } from './your-turn-popup/your-turn-popup.component';
import { GameStartedComponent } from './game-started/game-started.component';
import { CustomPopupComponent } from './custom-popup/custom-popup.component';


@NgModule({
  declarations: [PickColorCardComponent, YourTurnPopupComponent, GameStartedComponent, CustomPopupComponent],
  imports: [
    CommonModule,
    PopupsRoutingModule
  ]
})
export class PopupsModule { }
