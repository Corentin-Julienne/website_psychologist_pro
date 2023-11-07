import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosHeaderComponent } from './infos-header.component';

describe('InfosHeaderComponent', () => {
  let component: InfosHeaderComponent;
  let fixture: ComponentFixture<InfosHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfosHeaderComponent]
    });
    fixture = TestBed.createComponent(InfosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
