import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEntryComponent } from './appointment-entry.component';

describe('AppointmentEntryComponent', () => {
  let component: AppointmentEntryComponent;
  let fixture: ComponentFixture<AppointmentEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
