import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStartedComponent } from './game-started.component';

describe('GameStartedComponent', () => {
  let component: GameStartedComponent;
  let fixture: ComponentFixture<GameStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStartedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
