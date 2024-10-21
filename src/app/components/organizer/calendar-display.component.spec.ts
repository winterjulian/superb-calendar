import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDisplay } from './calendar-display.component';

describe('OrganizerComponent', () => {
  let component: CalendarDisplay;
  let fixture: ComponentFixture<CalendarDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
