import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCompanyComponent } from './support-company.component';

describe('SupportComponent', () => {
  let component: SupportCompanyComponent;
  let fixture: ComponentFixture<SupportCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportCompanyComponent]
    });
    fixture = TestBed.createComponent(SupportCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
