import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezServiceComponent } from './prez-service.component';

describe('PrezServiceComponent', () => {
  let component: PrezServiceComponent;
  let fixture: ComponentFixture<PrezServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrezServiceComponent]
    });
    fixture = TestBed.createComponent(PrezServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
