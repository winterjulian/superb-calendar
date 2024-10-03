import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthHeaderComponent } from './calendar-month-header.component';

describe('CalendarMonthHeaderComponent', () => {
  let component: CalendarMonthHeaderComponent;
  let fixture: ComponentFixture<CalendarMonthHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarMonthHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarMonthHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
