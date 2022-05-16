import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeletePageComponent } from './profile-delete-page.component';

describe('ProfileDeletePageComponent', () => {
  let component: ProfileDeletePageComponent;
  let fixture: ComponentFixture<ProfileDeletePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDeletePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDeletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
