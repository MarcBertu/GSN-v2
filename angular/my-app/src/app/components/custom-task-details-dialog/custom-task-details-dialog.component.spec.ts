import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTaskDetailsDialogComponent } from './custom-task-details-dialog.component';

describe('CustomTaskDetailsDialogComponent', () => {
  let component: CustomTaskDetailsDialogComponent;
  let fixture: ComponentFixture<CustomTaskDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTaskDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTaskDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
