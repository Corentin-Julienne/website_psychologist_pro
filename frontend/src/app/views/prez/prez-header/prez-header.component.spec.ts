import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezHeaderComponent } from './prez-header.component';

describe('PrezHeaderComponent', () => {
  let component: PrezHeaderComponent;
  let fixture: ComponentFixture<PrezHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrezHeaderComponent]
    });
    fixture = TestBed.createComponent(PrezHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
