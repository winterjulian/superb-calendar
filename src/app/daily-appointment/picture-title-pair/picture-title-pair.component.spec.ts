import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureTitlePairComponent } from './picture-title-pair.component';

describe('PictureTitlePairComponent', () => {
  let component: PictureTitlePairComponent;
  let fixture: ComponentFixture<PictureTitlePairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureTitlePairComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PictureTitlePairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
