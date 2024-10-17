import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsEventComponent } from './appointments-event.component';

describe('AppointmentsEventComponent', () => {
  let component: AppointmentsEventComponent;
  let fixture: ComponentFixture<AppointmentsEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
