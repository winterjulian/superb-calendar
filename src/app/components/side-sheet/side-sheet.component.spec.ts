import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideSheetComponent } from './side-sheet.component';

describe('AppointmentsOverviewComponent', () => {
  let component: SideSheetComponent;
  let fixture: ComponentFixture<SideSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
