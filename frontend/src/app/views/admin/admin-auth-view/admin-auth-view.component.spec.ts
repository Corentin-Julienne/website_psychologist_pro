import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthViewComponent } from './admin-auth-view.component';

describe('AdminAuthViewComponent', () => {
  let component: AdminAuthViewComponent;
  let fixture: ComponentFixture<AdminAuthViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuthViewComponent]
    });
    fixture = TestBed.createComponent(AdminAuthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
