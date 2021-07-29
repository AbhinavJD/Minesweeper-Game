import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineswepperComponent } from './mineswepper.component';

describe('MineswepperComponent', () => {
  let component: MineswepperComponent;
  let fixture: ComponentFixture<MineswepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineswepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineswepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
