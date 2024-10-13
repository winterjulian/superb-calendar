import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsHeaderComponent } from './appointments-header.component';

describe('AppointmentsHeaderComponent', () => {
  let component: AppointmentsHeaderComponent;
  let fixture: ComponentFixture<AppointmentsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
