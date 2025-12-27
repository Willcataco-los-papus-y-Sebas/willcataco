import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLogout } from './button-logout';

describe('ButtonLogout', () => {
  let component: ButtonLogout;
  let fixture: ComponentFixture<ButtonLogout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLogout],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonLogout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
