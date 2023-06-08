import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTabComponent } from './time-tab.component';

describe('TimeTabComponent', () => {
  let component: TimeTabComponent;
  let fixture: ComponentFixture<TimeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
