import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezViewComponent } from './prez-view.component';

describe('PrezViewComponent', () => {
  let component: PrezViewComponent;
  let fixture: ComponentFixture<PrezViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrezViewComponent]
    });
    fixture = TestBed.createComponent(PrezViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
