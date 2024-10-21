import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifierComponent } from './specifier.component';

describe('SpecifierComponent', () => {
  let component: SpecifierComponent;
  let fixture: ComponentFixture<SpecifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
