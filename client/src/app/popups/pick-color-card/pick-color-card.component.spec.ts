import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickColorCardComponent } from './pick-color-card.component';

describe('PickColorCardComponent', () => {
  let component: PickColorCardComponent;
  let fixture: ComponentFixture<PickColorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickColorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickColorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
