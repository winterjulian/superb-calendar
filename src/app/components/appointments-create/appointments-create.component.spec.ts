import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsCreateComponent } from './appointments-create.component';

describe('AppointmentsCreateComponent', () => {
  let component: AppointmentsCreateComponent;
  let fixture: ComponentFixture<AppointmentsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
