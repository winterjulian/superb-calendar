import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyerComponent } from './specifyer.component';

describe('SpecifyerComponent', () => {
  let component: SpecifyerComponent;
  let fixture: ComponentFixture<SpecifyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecifyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecifyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
