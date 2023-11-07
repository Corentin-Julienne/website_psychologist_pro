import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProComponent } from './cv-pro.component';

describe('CvProComponent', () => {
  let component: CvProComponent;
  let fixture: ComponentFixture<CvProComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvProComponent]
    });
    fixture = TestBed.createComponent(CvProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
