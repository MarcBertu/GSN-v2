import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifEmailDialogComponent } from './verif-email-dialog.component';

describe('VerifEmailDialogComponent', () => {
  let component: VerifEmailDialogComponent;
  let fixture: ComponentFixture<VerifEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifEmailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
