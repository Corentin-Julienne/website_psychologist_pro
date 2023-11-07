import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezServicesComponent } from './prez-services.component';

describe('PrezServicesComponent', () => {
  let component: PrezServicesComponent;
  let fixture: ComponentFixture<PrezServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrezServicesComponent]
    });
    fixture = TestBed.createComponent(PrezServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
