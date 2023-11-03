import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReservationComponent } from './vehicle-reservation.component';

describe('VehicleReservationComponent', () => {
  let component: VehicleReservationComponent;
  let fixture: ComponentFixture<VehicleReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleReservationComponent]
    });
    fixture = TestBed.createComponent(VehicleReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
