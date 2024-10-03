import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAppointmentComponent } from './daily-appointment.component';

describe('DailyappointmentComponent', () => {
  let component: DailyAppointmentComponent;
  let fixture: ComponentFixture<DailyAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
