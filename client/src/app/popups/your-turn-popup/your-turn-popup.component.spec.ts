import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourTurnPopupComponent } from './your-turn-popup.component';

describe('YourTurnPopupComponent', () => {
  let component: YourTurnPopupComponent;
  let fixture: ComponentFixture<YourTurnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourTurnPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourTurnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
