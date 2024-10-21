import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSpecifier } from './calendar-specifier.component';

describe('SpecifierComponent', () => {
  let component: CalendarSpecifier;
  let fixture: ComponentFixture<CalendarSpecifier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarSpecifier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarSpecifier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
