import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvEducComponent } from './cv-educ.component';

describe('CvEducComponent', () => {
  let component: CvEducComponent;
  let fixture: ComponentFixture<CvEducComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvEducComponent]
    });
    fixture = TestBed.createComponent(CvEducComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
