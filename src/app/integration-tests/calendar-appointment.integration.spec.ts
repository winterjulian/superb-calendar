// AI generated
import { Component } from '@angular/core';
import {ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed} from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { AppointmentsService } from '../services/appointments.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarWeekComponent } from "../components/calendar-week/calendar-week.component";


// dummy componente for `calendar-specifier`
@Component({
  selector: 'app-calendar-specifier',
  template: '<div></div>',
})
class CalendarSpecifierStubComponent {}

// dummy componente for `calendar-display`
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
    setFocussedBasicDateByDate: jest.Mock;  // Neue Mock-Methode hinzugefügt
    setPreferredTime: jest.Mock;  // Falls auch benötigt
  };

  beforeAll(() => {
    // implement mock for `window.matchMedia`
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
    // implement mock for AppointmentService
    appointmentServiceMock = {
      getResetCalendar: jest.fn().mockReturnValue(of(true)),
      getCurrentlyFocussedDate: jest.fn().mockReturnValue(of(new Date('2024-12-02T10:00:00'))),
      getAppointments: jest.fn().mockReturnValue(of([{
        id: 1,
        title: 'Team Meeting',
        startTime: { hour: 10, minute: 0 },
        endTime: { hour: 11, minute: 0 },
        start: new Date('2024-12-02T10:00:00'),
        end: new Date('2024-12-02T11:00:00'),
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

  it('should navigate and update services correctly when hour segment is clicked', fakeAsync(() => {
    // Erstelle Mock-Instanzen für die Services
    const appointmentsServiceMock = TestBed.inject(AppointmentsService);
    const routerMock = TestBed.inject(Router);

    // Definiere den Mock für `setFocussedBasicDateByDate` und `setPreferredTime`
    const setFocussedBasicDateByDateSpy = jest.spyOn(appointmentsServiceMock, 'setFocussedBasicDateByDate').mockImplementation(() => {});
    const setPreferredTimeSpy = jest.spyOn(appointmentsServiceMock, 'setPreferredTime').mockImplementation(() => {});

    // Spy auf die Methode `navigate` des Routers
    const navigateSpy = jest.spyOn(routerMock, 'navigate').mockResolvedValue(true);

    // Greife auf die child-Komponente `calendar-week` zu
    const calendarWeekComponent = fixture.debugElement.query(By.directive(CalendarWeekComponent)).componentInstance;

    // Simuliere das Klick-Event auf der `calendar-week`-Komponente
    const testDate = new Date('2024-12-02T10:00:00');
    calendarWeekComponent.hourSegmentClicked({ date: testDate });

    fixture.detectChanges();

    // Überprüfe, ob der appointmentsService mit dem richtigen Datum aufgerufen wurde
    expect(setFocussedBasicDateByDateSpy).toHaveBeenCalledWith(testDate);
    expect(setPreferredTimeSpy).toHaveBeenCalledWith(testDate);

    // Überprüfe, ob router.navigate mit den richtigen Parametern aufgerufen wurde
    expect(navigateSpy).toHaveBeenCalledWith([
      {
        outlets: {
          primary: 'calendar',
          side: ['appointments', calendarWeekComponent.functionsService.getBasicDateFromDateAsString(testDate)],
        }
      }
    ]);

    discardPeriodicTasks(); // Discard periodische Tasks
  }));

});
