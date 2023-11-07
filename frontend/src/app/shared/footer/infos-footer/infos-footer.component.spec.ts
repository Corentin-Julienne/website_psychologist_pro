import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosFooterComponent } from './infos-footer.component';

describe('InfosFooterComponent', () => {
  let component: InfosFooterComponent;
  let fixture: ComponentFixture<InfosFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfosFooterComponent]
    });
    fixture = TestBed.createComponent(InfosFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
