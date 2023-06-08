import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTabComponent } from './day-tab.component';

describe('DayTabComponent', () => {
  let component: DayTabComponent;
  let fixture: ComponentFixture<DayTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
