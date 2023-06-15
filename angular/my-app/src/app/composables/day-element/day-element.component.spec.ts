import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayElementComponent } from './day-element.component';

describe('DayElementComponent', () => {
  let component: DayElementComponent;
  let fixture: ComponentFixture<DayElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayElementComponent]
    });
    fixture = TestBed.createComponent(DayElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
