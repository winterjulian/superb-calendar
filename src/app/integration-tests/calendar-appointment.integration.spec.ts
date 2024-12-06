// AI generated
import { Component } from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { AppointmentsService } from '../services/appointments.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarWeekComponent } from "../components/calendar-week/calendar-week.component";


// dummy component for `calendar-specifier`
@Component({
  selector: 'app-calendar-specifier',
  template: '<div></div>',
})
class CalendarSpecifierStubComponent {}

// dummy component for `calendar-display`
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
    setFocussedBasicDateByDate: jest.Mock;
    setPreferredTime: jest.Mock;
  };

  beforeAll(() => {
    // implement mock for `window.matchMedia`
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    // implement mock for AppointmentService
    appointmentServiceMock = {
      getResetCalendar: jest.fn().mockReturnValue(of(true)),
      getCurrentlyFocussedDate: jest.fn().mockReturnValue(of(new Date('2024-11-02T10:00:00'))),
      getAppointments: jest.fn().mockReturnValue(of([{
        id: 1,
        title: 'Team Meeting',
        startTime: { hour: 10, minute: 0 },
        endTime: { hour: 11, minute: 0 },
        start: new Date('2024-11-02T10:00:00'),
        end: new Date('2024-11-02T11:00:00'),
        details: 'Weekly sync',
        totalMinutes: 60,
      }])),
      setFocussedBasicDateByDate: jest.fn(),  // Mock für setFocussedBasicDateByDate
      setPreferredTime: jest.fn(),  // Optional, wenn du es auch verwenden möchtest
    };

    TestBed.configureTestingModule({
      imports: [
        CalendarComponent,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
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

  it('should display one appointment correctly', () => {
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

  it('should navigate correctly when hour segment clicked function is invoked', fakeAsync(() => {
    // get the clickable element
    const appointmentTitleDebugEl = fixture.debugElement.query(By.css('mwl-calendar-event-title'));
    expect(appointmentTitleDebugEl).not.toBeNull();
    const appointmentTitle = appointmentTitleDebugEl.nativeElement;
    expect(appointmentTitle.textContent.trim()).toBe('Team Meeting');

    const testDate = new Date('2024-11-02T10:00:00');
    const routerMock = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(routerMock, 'navigate').mockResolvedValue(true);
    const calendarWeekComponent = fixture.debugElement.query(By.directive(CalendarWeekComponent)).componentInstance;

    appointmentTitle.click();

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith([
      {
        outlets: {
          primary: 'calendar',
          side: ['appointments', calendarWeekComponent.functionsService.getBasicDateFromDateAsString(testDate)],
        }
      }
    ]);
  }));

});
