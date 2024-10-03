import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatePreviewComponent } from './estate-preview.component';

describe('EstatePreviewComponent', () => {
  let component: EstatePreviewComponent;
  let fixture: ComponentFixture<EstatePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
