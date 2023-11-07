import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineTherapyComponent } from './online-therapy.component';

describe('OnlineTherapyComponent', () => {
  let component: OnlineTherapyComponent;
  let fixture: ComponentFixture<OnlineTherapyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineTherapyComponent]
    });
    fixture = TestBed.createComponent(OnlineTherapyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
