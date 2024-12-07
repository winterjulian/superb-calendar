// AI generated
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {Component} from "@angular/core";
import {CalendarComponent} from "../components/calendar/calendar.component";
import {of} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {AppointmentsService} from "../services/appointments.service";

// dummy component for `calendar-specifier`
@Component({
  selector: 'app-calendar-specifier',
  template: '<div></div>',
})
class CalendarSpecifierStubComponent {}

describe('Theme toggle functionality', () => {
  const bodyElement = document.body;
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
        matches: null,
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

  beforeEach(async () => {
    // implement mock for AppointmentService
    // async beforeEach with await TestBed for higher stability
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

    await TestBed.configureTestingModule({
      imports: [
        CalendarComponent,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [CalendarSpecifierStubComponent],
      providers: [{provide: AppointmentsService, useValue: appointmentServiceMock}],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have no "dark-theme" class per default', () => {

    const calendar = fixture.debugElement.query(By.css('#calendar'));
    expect(calendar).not.toBeNull();

    fixture.detectChanges();

    const bodyElement = document.body;
    expect(bodyElement.classList.contains('dark-theme')).toBe(false);

  });

  it('should add the "dark-theme" class to body after clicking on dark mode button', () => {

    const buttons = fixture.debugElement.queryAll(By.css('mat-button-toggle'));
    const darkModeButton = buttons.find(button => {
      const icon = button.query(By.css('mat-icon'));
      return icon?.nativeElement.textContent.trim() === 'brightness_2';
    });

    expect(darkModeButton).not.toBeNull();
    darkModeButton?.nativeElement.click();
    expect(bodyElement.classList.contains('dark-theme')).toBe(true);

  });

  it('should remove "dark-theme" class from body after clicking on light mode button', () => {

    const buttons = fixture.debugElement.queryAll(By.css('mat-button-toggle'));
    const darkModeButton = buttons.find(button => {
      const icon = button.query(By.css('mat-icon'));
      return icon?.nativeElement.textContent.trim() === 'brightness_2';
    });
    const lightModeButton = buttons.find(button => {
      const icon = button.query(By.css('mat-icon'));
      return icon?.nativeElement.textContent.trim() === 'brightness_5';
    });

    expect(darkModeButton).not.toBeNull();
    darkModeButton?.nativeElement.click();
    expect(bodyElement.classList.contains('dark-theme')).toBe(true);

    expect(lightModeButton).not.toBeNull();
    lightModeButton?.nativeElement.click();
    expect(bodyElement.classList.contains('dark-theme')).toBe(false);

  });
});
