import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileClientComponent } from './profile-client.component';

describe('HomeComponent', () => {
  let component: ProfileClientComponent;
  let fixture: ComponentFixture<ProfileClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileClientComponent]
    });
    fixture = TestBed.createComponent(ProfileClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
