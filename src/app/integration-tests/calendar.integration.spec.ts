import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { AppointmentsService } from '../services/appointments.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Dummy-Komponente für `calendar-specifier`
@Component({
  selector: 'app-calendar-specifier',
  template: '<div></div>',
})
class CalendarSpecifierStubComponent {}

// Dummy-Komponente für `calendar-display`
@Component({
  selector: 'app-calendar-display',
  template: '<div></div>',
})
class CalendarDisplayStubComponent {}

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let appointmentServiceMock: {
    getResetCalendar: jest.Mock;
    getCurrentlyFocussedDate: jest.Mock;
    getAppointments: jest.Mock;
  };

  beforeAll(() => {
    // Mock für `window.matchMedia` einrichten
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)', // Rückgabe abhängig von der Abfrage
        media: query,
        onchange: null,
        addListener: jest.fn(), // veraltet
        removeListener: jest.fn(), // veraltet
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    // Mock für den AppointmentService erstellen
    appointmentServiceMock = {
      getResetCalendar: jest.fn().mockReturnValue(of(true)),
      getCurrentlyFocussedDate: jest.fn().mockReturnValue(of(new Date('2024-12-02T10:00:00'))),
      getAppointments: jest.fn().mockReturnValue(
        of([
          {
            id: 1,
            title: 'Team Meeting',
            startTime: { hour: 10, minute: 0 },
            endTime: { hour: 11, minute: 0 },
            start: new Date('2024-12-02T10:00:00'),
            end: new Date('2024-12-02T11:00:00'),
            details: 'Weekly sync',
            totalMinutes: 60,
          },
        ])
      ),
    };

    TestBed.configureTestingModule({
      imports: [CalendarComponent, BrowserAnimationsModule],
      declarations: [
        CalendarSpecifierStubComponent,
        CalendarDisplayStubComponent,
      ],
      providers: [{ provide: AppointmentsService, useValue: appointmentServiceMock }],
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load and display one appointment correctly', () => {
    // less specific error variant:
    // const appointmentTitle = fixture.debugElement.query(By.css('mwl-calendar-event-title')).nativeElement;
    // expect(appointmentTitle).not.toBeNull();
    // expect(appointmentTitle.textContent).toBe('Team Meeting');

    // more specific error variant (debugElement):
    const appointmentTitleDebugEl = fixture.debugElement.query(By.css('mwl-calendar-event-title'));
    expect(appointmentTitleDebugEl).not.toBeNull();
    const appointmentTitle = appointmentTitleDebugEl.nativeElement;
    expect(appointmentTitle.textContent.trim()).toBe('Team Meeting');
  });
});
