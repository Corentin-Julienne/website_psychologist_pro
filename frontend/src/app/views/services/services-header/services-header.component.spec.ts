import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesHeaderComponent } from './services-header.component';

describe('ServicesHeaderComponent', () => {
  let component: ServicesHeaderComponent;
  let fixture: ComponentFixture<ServicesHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesHeaderComponent]
    });
    fixture = TestBed.createComponent(ServicesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
