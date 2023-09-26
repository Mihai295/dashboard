import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseModalComponent } from './case-modal.component';

describe('CaseModalComponent', () => {
  let component: CaseModalComponent;
  let fixture: ComponentFixture<CaseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseModalComponent]
    });
    fixture = TestBed.createComponent(CaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
