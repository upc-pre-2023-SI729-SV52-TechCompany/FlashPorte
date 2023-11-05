import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsClientComponent } from './contracts-client.component';

describe('ContractsComponent', () => {
  let component: ContractsClientComponent;
  let fixture: ComponentFixture<ContractsClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractsClientComponent]
    });
    fixture = TestBed.createComponent(ContractsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
