import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsFooterComponent } from './credits-footer.component';

describe('CreditsFooterComponent', () => {
  let component: CreditsFooterComponent;
  let fixture: ComponentFixture<CreditsFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsFooterComponent]
    });
    fixture = TestBed.createComponent(CreditsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
